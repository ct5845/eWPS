import {Component, HostListener, OnInit} from '@angular/core';
import {SessionService} from '../session.service';
import {Session} from '../session';
import {Papa} from 'ngx-papaparse';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
    public sessions: Observable<Session[]>;
    public dateSessions: Observable<Map<string, Session[]>>;

    constructor(private sessionService: SessionService,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private papa: Papa) {
    }

    ngOnInit() {
        this.sessions = this.sessionService.get();

        this.dateSessions = this.sessions.pipe(
            map(sessions => {
                const sessionMap = new Map<string, Session[]>();

                sessions.forEach((session) => {
                    const key = session.timestamp.format('YYYY-MM-DD');

                    if (sessionMap.has(key)) {
                        sessionMap.set(key, [...sessionMap.get(key), session]);
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
