import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Piece} from '../../piece/piece';
import {Session} from '../session';
import {SessionService} from '../session.service';

@Component({
    selector: 'app-session-details',
    templateUrl: './session-details.component.html',
    styleUrls: [ './session-details.component.scss' ]
})
export class SessionDetailsComponent implements OnInit {
    @Input() public $session: Observable<Session>;

    public $piece: Observable<Piece[]>;

    constructor(private sessionService: SessionService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.$piece = this.$session.pipe(map(session => [ session.entireSession ]));
    }

    update(session: Session, field: string) {
        this.sessionService.update(session)
            .then(() => {
                this.snackBar.open(`${field} saved!`);
            });
    }
}
