import {Component, HostListener, OnInit} from '@angular/core';
import {SessionService} from '../session.service';
import {Session} from '../session';
import {Papa} from 'ngx-papaparse';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
    public $sessions: Observable<Session[]>;
    public sessionsByDay: Observable<Map<string, Session[]>>;

    public hasSessions: Observable<boolean>;

    constructor(private sessionService: SessionService,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private papa: Papa) {
    }

    ngOnInit() {
        this.$sessions = this.sessionService.get();

        this.hasSessions = this.$sessions.pipe(map(sessions => sessions.length > 0));

        this.sessionsByDay = this.$sessions.pipe(
            map(sessions => {
                const sessionMap = new Map<string, Session[]>();

                sessions.forEach((session) => {
                    const key = session.timestamp.format('YYYY-MM-DD');

                    if (sessionMap.has(key)) {
                        const orderedSessions: Session[] = [...sessionMap.get(key), session].sort((s1, s2) => {
                            return s2.details.oarlock.seat - s1.details.oarlock.seat;
                        });

                        sessionMap.set(key, orderedSessions);
                    } else {
                        sessionMap.set(key, [session]);
                    }
                });

                return sessionMap;
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
        this.router.navigate(['/session', session.id]);
    }

    @HostListener('drop', ['$event'])
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

                    if (!data) {
                        this.snackBar.open(`Couldn't load '${file.name}', possibly invalid date, or data format`);
                    } else {
                        this.sessionService.add(data);
                        this.snackBar.open(`'${file.name}', successfully loaded`);
                    }
                }
            });
        }
    }

    @HostListener('dragover', ['$event'])
    dragOver($event: any) {
        this.preventAndStop($event);
    }

    @HostListener('dragleave', ['$event'])
    dragLeave($event: any) {
        this.preventAndStop($event);
    }

    preventAndStop($event: any) {
        $event.preventDefault();
        $event.stopImmediatePropagation();
    }

    public compareMapDates(a: any, b: any) {
        return a.key > b.key ? -1 : 1;
    }
}
