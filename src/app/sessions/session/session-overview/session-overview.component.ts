import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Session} from '../../session';
import {debounceTime, filter, map, shareReplay, take} from 'rxjs/operators';
import {Stroke} from '../../../strokes/stroke';
import {Piece} from '../../../piece/piece';
import {DateTime} from 'luxon';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {PlotComponent} from 'angular-plotly.js';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
    selector: 'app-session-overview',
    templateUrl: './session-overview.component.html',
    styleUrls: ['./session-overview.component.scss']
})
export class SessionOverviewComponent implements OnInit, OnDestroy {
    @Input() public session: Observable<Session>;
    @Output() public pieceChanged = new EventEmitter<Piece>();
    @ViewChild(PlotComponent) plotCmp: PlotComponent;

    public data: Observable<any[]>;
    public layout: any;
    public pieces: Observable<Piece[]>;

    private piece: Observable<Piece>;
    private dateRange = new BehaviorSubject<string[]>([]);
    private layoutChanges: Observable<BreakpointState>;

    constructor(breakPoint: BreakpointObserver) {
        this.layout = {
            showlegend: true,
            margin: {
                l: 40,
                t: 20,
                r: 10,
                b: 50
            },
            legend: {
                'orientation': 'h'
            },
            xaxis: {
                type: 'date',
                rangeselector: {}
            }
        };

        this.layoutChanges = breakPoint.observe([
            Breakpoints.Handset
        ]);
    }

    ngOnInit() {
        this.data = this.session.pipe(
            map(session => this.getData(session)),
            shareReplay(1));

        const dateRangeChanged =
                  this.dateRange.pipe(
                      filter(values => !!values && typeof values[0] === 'string'),
                      map(value => [DateTime.fromJSDate(new Date(value[0])).toISO(), DateTime.fromJSDate(new Date(value[1])).toISO()]),
                      shareReplay(1),
                  );

        this.piece = combineLatest(this.session, dateRangeChanged)
            .pipe(
                debounceTime(100),
                map((values) => {
                    const session: Session = values[0];
                    const from             = values[1][0];
                    const to               = values[1][1];

                    const start = session.strokes.findIndex(stroke => stroke.timestamp >= from);
                    const end   = session.strokes.findIndex((stroke, index, strokes) => {
                        if (index < strokes.length - 1) {
                            return strokes[index + 1].timestamp > to;
                        } else if (stroke.timestamp === to || index === strokes.length - 1) {
                            return true;
                        }
                        return false;
                    });

                    return Piece.fromRange(start, end, session);
                }),
                shareReplay(1));

        this.pieces = this.piece.pipe(map(piece => [piece]));

        this.piece.pipe(
            untilComponentDestroyed(this))
            .subscribe(piece => this.pieceChanged.emit(piece));
    }

    ngOnDestroy(): void {
    }

    plotUpdated(updated: any) {
        this.dateRange.next(updated.layout.xaxis.range);
    }

    plotRangeChanged(update: any) {
        if (!!update['xaxis.range[0]']) {
            this.dateRange.next([update['xaxis.range[0]'], update['xaxis.range[1]']]);
        } else if (!!update['xaxis.range']) {
            this.dateRange.next(update['xaxis.range']);
        }
    }

    putRangeIntoView(start: number, end: number) {
        this.session.pipe(take(1))
            .subscribe(session => {
                const from = session.strokes[start].timestamp;
                const to   = session.strokes[end].timestamp;

                this.layout.xaxis.autorange = false;
                this.layout.xaxis.range     = [
                    from,
                    to
                ];

                this.plotCmp.updatePlot();
            });
    }

    private getData(session: Session) {
        const x = session.strokes.map(stroke => stroke.timestamp);

        const workData = Stroke.getWorkData.map((data, index) => {
            const y = session.strokes.map(stroke => stroke[data.field]);

            return {
                x,
                y,
                type: 'scatter',
                mode: 'lines+markers',
                connectgaps: true,
                name: data.name,
                visible: index === 0 ? true : 'legendonly'
            };
        });

        const angleData = Stroke.getAngleData.map(data => {
            const y = session.strokes.map(stroke => stroke[data.field]);

            return {x, y, type: 'scatter', mode: 'lines+markers', connectgaps: true, name: data.name, visible: 'legendonly'};
        });

        return [
            ...workData,
            ...angleData
        ];
    }
}
