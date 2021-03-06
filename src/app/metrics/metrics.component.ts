import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {pluck, take} from 'rxjs/operators';
import {Piece} from '../piece/piece';
import {Session} from '../sessions/session';
import {MetricAveragesComponent} from '../sessions/session/metric-averages/metric-averages.component';

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: [ './metrics.component.scss' ]
})
export class MetricsComponent implements OnInit {
    @Input() public $session: Observable<Session>;
    @Input() public $pieces: Observable<Piece[]>;
    @Input() public showSessionInformation: boolean;

    @ViewChild(MetricAveragesComponent) public metrics: MetricAveragesComponent;

    @Output() public updated = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        if (!this.$pieces) {
            this.$pieces = this.$session.pipe(pluck('pieces'));
        }
    }

    export() {
        this.metrics.api.pipe(take(1)).subscribe(api => api.exportDataAsCsv({allColumns: true}));
    }

    updatePiece() {
        this.updated.emit();
    }
}
