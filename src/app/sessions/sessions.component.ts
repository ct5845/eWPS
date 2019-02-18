import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Session} from './session';
import {SessionService} from './session.service';

@Component({
    selector: 'app-sessions',
    templateUrl: './sessions.component.html',
    styleUrls: [ './sessions.component.scss' ]
})
export class SessionsComponent implements OnInit {
    public sessions: Observable<any[]>;

    constructor(private sessionService: SessionService) {
    }

    ngOnInit() {
        this.sessions = this.sessionService.get();
    }

}
