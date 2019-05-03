import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Papa} from 'ngx-papaparse';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {Session} from '../session';
import {SessionService} from '../session.service';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: [ './session-list.component.scss' ]
})
export class SessionListComponent implements OnInit {
    public $saving = new BehaviorSubject(false);
    public $sessions: Observable<Session[]>;
    public sessionsByDay: Observable<Map<string, Map<string, Session[]>>>;

    constructor(private sessionService: SessionService,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private papa: Papa) {
    }

    ngOnInit() {
        this.$sessions = this.sessionService.get();

        this.sessionsByDay = this.$sessions.pipe(
            map(sessions => {
                const allSessions = new Map<string, Map<string, Session[]>>();

                sessions.forEach((session) => {
                    const timestampKey = session.timestamp.format('YYYY-MM-DD');

                    if (allSessions.has(timestampKey)) {
                        const todaysSession = allSessions.get(timestampKey);

                        if (todaysSession.has(session.group)) {
                            const orderedSessions: Session[] = [ ...todaysSession.get(session.group), session ].sort((s1, s2) => {
                                return s2.details.oarlock.seat - s1.details.oarlock.seat;
                            });

                            todaysSession.set(session.group, orderedSessions);
                        } else {
                            todaysSession.set(session.group, [ session ]);
                        }
                    } else {
                        const todaysSession = new Map<string, Session[]>();

                        todaysSession.set(session.group, [ session ]);

                        allSessions.set(timestampKey, todaysSession);
                    }
                });

                return allSessions;
            })
        );
    }

    delete(session: Session, $event: Event) {
        this.preventAndStop($event);

        const dialog = this.dialog.open(DeleteDialogComponent);

        dialog.afterClosed()
            .subscribe(res => {
                if (res === true) {
                    this.sessionService.delete(session);
                }
            });
    }

    goTo(session: Session) {
        this.router.navigate([ '/session', session.id ]);
    }

    @HostListener('drop', [ '$event' ])
    drop($event: any) {
        this.preventAndStop($event);

        if ($event.dataTransfer) {
            $event.dataTransfer.dropEffect = 'copy';
        }

        const numberOfFiles = $event.dataTransfer.files.length;

        for (let i = 0; i < numberOfFiles; i++) {
            this.papa.parse($event.dataTransfer.files.item(i), {
                complete: (results, file: File) => {
                    const data = Session.fromCSV(file, results.data);
                    this.$saving.next(true);

                    if (!data) {
                        this.snackBar.open(`Couldn't load '${file.name}', possibly invalid date, or data format`);
                    } else {
                        this.sessionService.add(data).then((success) => {
                            this.snackBar.open(`File(s) uploaded`);
                        }, () => {
                            this.snackBar.open(`File upload failed`);
                        }).finally(() => {
                            this.$saving.next(false);
                        });
                    }
                }
            });
        }
    }

    @HostListener('dragover', [ '$event' ])
    dragOver($event: any) {
        this.preventAndStop($event);
    }

    @HostListener('dragleave', [ '$event' ])
    dragLeave($event: any) {
        this.preventAndStop($event);
    }

    preventAndStop($event: any) {
        $event.preventDefault();
        $event.stopImmediatePropagation();
    }

    public compareKeys(a: any, b: any) {
        return a.key > b.key ? -1 : 1;
    }
}
