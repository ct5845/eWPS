import {DecimalPipe} from '@angular/common';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from 'rxjs';
import {Session} from '../../session';
import {debounceTime, filter, map, mergeMap, pluck, shareReplay, take} from 'rxjs/operators';
import {Stroke} from '../../../strokes/stroke';
import {Piece} from '../../../piece/piece';
import {DateTime} from 'luxon';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {PlotComponent} from 'angular-plotly.js';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {SessionService} from '../../session.service';

@Component({
    selector: 'app-session-overview',
    templateUrl: './session-overview.component.html',
    styleUrls: [ './session-overview.component.scss' ]
})
export class SessionOverviewComponent implements OnInit, OnDestroy {
    @Input() public $session: Observable<Session>;

    @ViewChild(PlotComponent) plotCmp: PlotComponent;

    public $data: Observable<any[]>;
    public layout: any;
    public $pieces: Observable<Piece[]>;
    public $strokes: Observable<Stroke[]>;
    public $entireSession: Observable<Piece>;
    public $selectedPiece: Observable<Piece>;

    public $viewFrom = new ReplaySubject<string>(1);
    public $viewTo = new ReplaySubject<string>(1);

    private $dateRange: Observable<any[]>;

    private numberPipe = new DecimalPipe('en-GB');

    constructor(private sessionService: SessionService) {
        this.layout = {
            showlegend: false,
            margin: {
                l: 10,
                t: 10,
                r: 20,
                b: 10
            },
            height: 400,
            xaxis: {
                type: 'date',
                rangeslider: {}
            }
        };
    }

    ngOnInit() {
        this.$pieces = this.$session.pipe(pluck('pieces'));
        this.$entireSession = this.$session.pipe(pluck('entireSession'));

        this.$strokes = this.$session.pipe(
            take(1),
            pluck('id'),
            mergeMap(id => this.sessionService.strokes(id)),
            shareReplay(1));


        this.$data = this.$strokes.pipe(
            map(strokes => this.getData(strokes)),
            shareReplay(1));

        this.$dateRange = combineLatest(this.$viewFrom, this.$viewTo)
            .pipe(
                map(value => [ DateTime.fromJSDate(new Date(value[ 0 ])).toISO(), DateTime.fromJSDate(new Date(value[ 1 ])).toISO() ]),
                shareReplay(1));

        this.$selectedPiece = combineLatest(
            this.$strokes,
            this.$dateRange,
            this.$session.pipe(take(1)))
            .pipe(
                debounceTime(100),
                map((values) => {
                    const strokes: Stroke[] = values[ 0 ];
                    const from = values[ 1 ][ 0 ];
                    const to = values[ 1 ][ 1 ];
                    const session = values[ 2 ];

                    const start = strokes.findIndex(stroke => stroke.timestamp >= from);
                    const end = strokes.findIndex((stroke, index, arr) => {
                        if (index < arr.length - 1) {
                            return arr[ index + 1 ].timestamp > to;
                        } else if (stroke.timestamp === to || index === arr.length - 1) {
                            return true;
                        }
                        return false;
                    });

                    const piece = Piece.fromRange(start, end, session, strokes);
                    piece.name = 'Current Selection';

                    return piece;
                }),
                shareReplay(1));
    }

    ngOnDestroy(): void {
    }

    savePiece() {
        combineLatest(this.$selectedPiece, this.$session)
            .pipe(take(1))
            .subscribe(values => {
                const piece: Piece = values[ 0 ].copy();
                const session: Session = values[ 1 ];

                piece.name = `${this.numberPipe.transform(piece.distance, '1.0-0')}m @ r${this.numberPipe.transform(piece.averages.rate, '1.0-0')}`;
                session.pieces.push(piece);

                this.sessionService.update(session);
            });
    }

    plotUpdated(updated: any) {
        this.$viewFrom.next(updated.layout.xaxis.range[ 0 ]);
        this.$viewTo.next(updated.layout.xaxis.range[ 1 ]);
    }

    plotRangeChanged(update: any) {
        if (!!update[ 'xaxis.range[0]' ]) {
            this.$viewFrom.next(update[ 'xaxis.range[0]' ]);
            this.$viewTo.next(update[ 'xaxis.range[1]' ]);
        } else if (!!update[ 'xaxis.range' ]) {
            this.$viewFrom.next(update[ 'xaxis.range' ][ 0 ]);
            this.$viewTo.next(update[ 'xaxis.range' ][ 1 ]);
        }
    }

    putRangeIntoView(start?: number, end?: number) {
        this.$strokes.pipe(take(1))
            .subscribe(strokes => {
                const from = strokes[ start || 0 ].timestamp;
                const to = strokes[ end || (strokes.length - 1) ].timestamp;

                this.layout.xaxis.autorange = false;
                this.layout.xaxis.range = [
                    from,
                    to
                ];

                this.plotCmp.updatePlot();
            });
    }

    private getData(strokes: Stroke[]) {
        const x = strokes.map(stroke => stroke.timestamp);
        const y = strokes.map(stroke => stroke.rate);

        return [ {x, y, type: 'scatter', connectgaps: true, mode: 'lines+markers'} ];

        // const workData = Stroke.getWorkData.map((data, index) => {
        //     const y = session.strokes.map(stroke => stroke[data.field]);
        //
        //     return {
        //         x,
        //         y,
        //         type: 'scatter',
        //         mode: 'lines+markers',
        //         connectgaps: true,
        //         name: data.name,
        //         visible: index === 0 ? true : 'legendonly'
        //     };
        // });
        //
        // const angleData = Stroke.getAngleData.map(data => {
        //     const y = session.strokes.map(stroke => stroke[data.field]);
        //
        //     return {x, y, type: 'scatter', mode: 'lines+markers', connectgaps: true, name: data.name, visible: 'legendonly'};
        // });
    }
}
