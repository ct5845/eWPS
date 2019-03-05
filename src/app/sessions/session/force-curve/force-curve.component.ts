import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Piece} from '../../models/piece';
import {map} from 'rxjs/internal/operators';

@Component({
    selector: 'app-force-curve',
    templateUrl: './force-curve.component.html',
    styleUrls: ['./force-curve.component.scss']
})
export class ForceCurveComponent implements OnInit {
    @Input() public pieces: Observable<Piece[]>;

    public data: Observable<any>;
    public layout: any;

    public targetCurve = {
        x: [-55, -50, -22, 19, 35],
        y: [0, 100, 500, 100, 0],
        name: 'Target',
        line: {
            dash: 'dot',
            width: 4
        },
        mode: 'lines'
    };

    constructor() {
    }

    ngOnInit() {
        this.layout = {
            showlegend: true,
            xaxis: {
                title: 'Oar Angle',
                range: [-70, 50]
            },
            yaxis: {
                title: 'Force (N)'
            },
            shapes: [
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'paper',
                    x0: -500,
                    x1: -55,
                    y0: 0,
                    y1: 1,
                    fillcolor: '#dfe6e9',
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'paper',
                    x0: -55,
                    x1: -50,
                    y0: 0,
                    y1: 1,
                    fillcolor: '#00b894',
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'paper',
                    x0: -50,
                    x1: -22,
                    y0: 0,
                    y1: 1,
                    fillcolor: '#55efc4',
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'paper',
                    x0: -22,
                    x1: 19,
                    y0: 0,
                    y1: 1,
                    fillcolor: '#74b9ff',
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'paper',
                    x0: 19,
                    x1: 35,
                    y0: 0,
                    y1: 1,
                    fillcolor: '#0984e3',
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'paper',
                    x0: -35,
                    x1: Number.MAX_SAFE_INTEGER,
                    y0: 0,
                    y1: 1,
                    fillcolor: '#dfe6e9',
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },
            ]
        };

        if (!!this.pieces) {
            this.data = this.pieces.pipe(
                map(pieces => {
                    const maxForce = pieces.reduce((max, piece) => {
                        return Math.max(max, piece.average.forceMax);
                    }, 0);

                    this.targetCurve.y[2] = maxForce;

                    return [...pieces.map((piece: Piece) => {
                        const x = [
                            piece.average.catch.toFixed(),
                            (piece.average.catch + piece.average.slip).toFixed(),
                            piece.average.forceMaxDeg.toFixed(),
                            (piece.average.finish - piece.average.wash).toFixed(),
                            piece.average.finish.toFixed()];

                        const y = [
                            0,
                            100,
                            piece.average.forceMax.toFixed(),
                            100,
                            0
                        ];

                        const text = [
                            ...x
                        ];

                        return {
                            x, y, type: 'scatter', mode: 'lines+markers', name: piece.name, connectgaps: true,
                            marker: {
                                size: 12
                            }
                        };
                    })];
                })
            );
        }
    }

}
