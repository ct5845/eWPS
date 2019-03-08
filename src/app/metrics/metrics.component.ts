import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Session} from '../sessions/session';
import {Piece} from '../piece/piece';
import {pluck} from 'rxjs/operators';

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
    @Input() public $session: Observable<Session>;

    public $pieces: Observable<Piece[]>;

    constructor() {
    }

    ngOnInit() {
        this.$pieces = this.$session.pipe(pluck('pieces'));
    }

}
