import {Component, HostListener, OnInit} from '@angular/core';
import {SessionService} from '../session.service';
import {Session} from '../models/session';
import {Papa} from 'ngx-papaparse';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/index';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
    public sessions: Observable<Session[]>;
    public selectedSession: Session;

    constructor(private sessionService: SessionService,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private papa: Papa) {
    }

    ngOnInit() {
        this.refreshSessions();
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
                complete: (results, file) => {
                    const data = Session.fromCSV(results.data);

                    if (!data) {
                        this.snackBar.open(`Couldn't load '${file.name}', possibly invalid date, or data format`);
                    } else {
                        const session = this.sessionService.add(data);
                        this.snackBar.open(`'${file.name}', successfully loaded`);
                    }

                    // if (numberOfFiles === 1) {
                    //     this.goTo(session);
                    // } else {
                    //     this.refreshSessions();
                    // }
                }
            });
        }
    }

    refreshSessions() {
        this.sessions = this.sessionService.get();
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
}
