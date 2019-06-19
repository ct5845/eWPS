import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Piece} from '../piece/piece';
import {map, tap} from 'rxjs/operators';
import {SessionService} from '../sessions/session.service';
import {Plotly} from 'angular-plotly.js/src/app/shared/plotly.interface';
import {PlotComponent} from 'angular-plotly.js';

export function targetLine(x: number) {
    return {
        xref: 'x',
        yref: 'paper',
        layer: 'below',
        x0: x,
        x1: x,
        y0: 0,
        y1: 1,
        type: 'line',
        name: 'catch',
        opacity: 0.5,
        line: {
            color: '#74b9ff',
            width: 3,
            dash: 'dot'
        }
    };
}

function indexToTarget(index: number) {
    switch (index) {
        case 0:
            return 'Catch:';
        case 1:
            return 'Load';
        case 2:
            return 'Peak';
        case 3:
            return 'Unload';
        case 4:
            return 'Finish';
    }
}

@Component({
    selector: 'app-angle-plot',
    templateUrl: './angle-plot.component.html',
    styleUrls: ['./angle-plot.component.scss']
})
export class AnglePlotComponent implements OnInit {
    @Input() public $pieces: Observable<Piece[]>;
    @Input() public showSessionInformation: boolean;

    public $data: Observable<any>;
    public layout: any;

    @ViewChild(PlotComponent, { static: false }) public plot: PlotComponent;

    constructor(private sessionService: SessionService) {
    }

    ngOnInit() {
        this.layout = {
            showlegend: true,
            autosize: true,
            xaxis: {
                title: 'Oar Angle',
                zeroline: false,
                showgrid: false,
                tickvals: [-55, -50, -21, 20, 35],
                ticktext: ['Catch (-55)', 'Load (-50)', 'Peak (-21)', 'Unload (20)', 'Finish (35)']
            },
            shapes: [targetLine(-55),
                     targetLine(-50),
                     targetLine(-21),
                     targetLine(19),
                     targetLine(35)
            ]
        };

        if (!!this.$pieces && !this.showSessionInformation) {
            this.$data = this.$pieces.pipe(
                map(pieces => {
                    return [...pieces.map((piece: Piece) => {
                        const x = [
                            piece.averages.catch.toFixed(),
                            (piece.averages.catch + piece.averages.slip).toFixed(),
                            (piece.averages.catch + piece.averages.slip).toFixed(),
                            piece.averages.forceMaxDeg.toFixed(),
                            (piece.averages.finish - piece.averages.wash).toFixed(),
                            (piece.averages.finish - piece.averages.wash).toFixed(),
                            piece.averages.finish.toFixed()];

                        return {
                            x, type: 'box', name: piece.name
                        };
                    })];
                })
            );
        } else if (!!this.$pieces) {
            this.$data = combineLatest(this.$pieces, this.sessionService.get())
                .pipe(
                    map(values => {
                        const pieces   = values[0];
                        const sessions = values[1];

                        return [...pieces.map((piece: Piece) => {
                            const session = sessions.find(s => s.id === piece.sessionId);

                            const x = [
                                piece.averages.catch.toFixed(),
                                (piece.averages.catch + piece.averages.slip).toFixed(),
                                (piece.averages.catch + piece.averages.slip).toFixed(),
                                piece.averages.forceMaxDeg.toFixed(),
                                (piece.averages.finish - piece.averages.wash).toFixed(),
                                (piece.averages.finish - piece.averages.wash).toFixed(),
                                piece.averages.finish.toFixed()];

                            return {
                                x, type: 'box', name: `${session.name}`
                            };
                        })];
                    })
                );
        }
    }

    export() {
        console.log('export');
    }
}
