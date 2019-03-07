import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Piece} from '../../../piece/piece';
import {map, tap} from 'rxjs/internal/operators';

function targetLine(x: number) {
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
    selector: 'app-force-curve',
    templateUrl: './force-curve.component.html',
    styleUrls: ['./force-curve.component.scss']
})
export class ForceCurveComponent implements OnInit {
    @Input() public pieces: Observable<Piece[]>;

    public data: Observable<any>;
    public layout: any;

    constructor() {
    }

    ngOnInit() {
        this.layout = {
            showlegend: true,
            margin: {
                l: 30,
                t: 20,
                r: 10,
                b: 50
            },
            legend: {
                'orientation': 'h'
            },
            xaxis: {
                title: 'Oar Angle (°)',
                zeroline: false,
                dtick: 2
            },
            yaxis: {
                title: 'Force (N)'
            },
            shapes: [targetLine(-55),
                     targetLine(-50),
                     targetLine(-22),
                     targetLine(19),
                     targetLine(35)
            ]
        };

        if (!!this.pieces) {
            this.data = this.pieces.pipe(
                map(pieces => {
                    return [...pieces.map((piece: Piece) => {
                        const x = [
                            piece.average.catch.toFixed(),
                            (piece.average.catch + piece.average.slip).toFixed(),
                            piece.average.forceMaxDeg.toFixed(),
                            (piece.average.finish - piece.average.wash).toFixed(),
                            piece.average.finish.toFixed()];

                        const text = x.map((v, index) => {
                            return `${indexToTarget(index)} ${v}°`;
                        });

                        const y = [
                            0,
                            100,
                            piece.average.forceMax.toFixed(),
                            100,
                            0
                        ];

                        return {
                            x, y, text, type: 'scatter', mode: 'lines+markers', name: piece.name, connectgaps: true,
                            hoverinfo: 'text', marker: {
                                size: 12
                            }
                        };
                    })];
                })
            );
        }
    }

}
