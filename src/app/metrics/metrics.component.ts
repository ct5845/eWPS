import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Session} from '../sessions/session';
import {Piece} from '../piece/piece';
import {pluck, take} from 'rxjs/operators';
import {MetricAveragesComponent} from '../sessions/session/metric-averages/metric-averages.component';

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
    @Input() public $session: Observable<Session>;

    public $pieces: Observable<Piece[]>;

    @ViewChild(MetricAveragesComponent) public metrics: MetricAveragesComponent;

    constructor() {
    }

    ngOnInit() {
        this.$pieces = this.$session.pipe(pluck('pieces'));
    }

    export() {
        this.metrics.api.pipe(take(1)).subscribe(api => api.exportDataAsCsv({ allColumns: true }));
    }

}
