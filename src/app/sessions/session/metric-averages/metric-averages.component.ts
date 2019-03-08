import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {combineLatest, Observable, ReplaySubject} from 'rxjs';
import {Piece} from '../../../piece/piece';
import {ColDef, GridReadyEvent, GridApi, ValueFormatterParams, ColumnApi, ColumnGroupOpenedEvent, RowNode} from 'ag-grid-community';
import {DatePipe, DecimalPipe} from '@angular/common';

import {STROKE_COLUMNS} from '../../../strokes/stroke-columns';
import {ButtonRendererComponent} from '../../../ag-grid/button-renderer/button-renderer.component';

@Component({
    selector: 'app-metric-averages',
    templateUrl: './metric-averages.component.html',
    styleUrls: ['./metric-averages.component.scss']
})
export class MetricAveragesComponent implements OnInit, OnDestroy {
    @Input() public $pieces: Observable<Piece[]>;
    @Input() public $headerPiece: Observable<Piece>;
    @Input() public $footerPiece: Observable<Piece>;
    @Input() public selection: string;
    @Input() public allowDelete: boolean;

    @Output() public onDelete = new EventEmitter<Piece>();

    public columnDefs: ColDef[];
    public frameworkComponents: any;

    private api        = new ReplaySubject<GridApi>(1);
    private columnApi  = new ReplaySubject<ColumnApi>(1);
    private numberPipe = new DecimalPipe('en-GB');
    private datePipe   = new DatePipe('en-GB');

    constructor() {
    }

    ngOnInit() {
        this.frameworkComponents = {
            'buttonRenderer': ButtonRendererComponent
        };

        this.columnDefs = [...STROKE_COLUMNS.map(group => {
            return {
                headerName: group.name,
                children: group.children.map(child => {
                    const col = {...child};

                    col.headerName = col.name;

                    if (col.type === 'numericColumn') {
                        col.valueFormatter = (params: ValueFormatterParams) => {
                            if (Array.isArray(params.value)) {
                                return params.value.map(v => this.numberPipe.transform(v, '1.0-0')).join('/');
                            } else {
                                return this.numberPipe.transform(params.value, '1.0-0');
                            }
                        };
                    } else if (col.type === 'dateColumn') {
                        col.valueFormatter = (params: ValueFormatterParams) => {
                            return this.datePipe.transform(params.value, 'HH:mm');
                        };
                    }

                    if (child.isAverage) {
                        col.field = `averages.${child.field}`;
                    }

                    col.sortable          = true;
                    col.checkboxSelection = col.field === 'name' && this.selection === 'multiple';

                    return col;
                })
            };
        }), {
            field: 'delete',
            pinned: 'right',
            hide: !this.allowDelete,
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                buttons: [{
                    icon: 'delete',
                    color: 'warn',
                    onClick: (params: any) => {
                        this.onDelete.emit(params.data);
                    },
                    show: (params: RowNode) => {
                        return !params.isRowPinned();
                    }
                }]
            }
        }];

        combineLatest(this.api, this.$pieces)
            .pipe(untilComponentDestroyed(this))
            .subscribe(values => {
                const api    = values[0];
                const pieces = values[1];

                api.setRowData(pieces);
            });

        if (!!this.$footerPiece) {
            combineLatest(this.api, this.$footerPiece)
                .pipe(untilComponentDestroyed(this))
                .subscribe(values => {
                    const api   = values[0];
                    const piece = values[1];

                    api.setPinnedBottomRowData([piece]);
                });
        }

        if (!!this.$headerPiece) {
            combineLatest(this.api, this.$headerPiece)
                .pipe(untilComponentDestroyed(this))
                .subscribe(values => {
                    const api   = values[0];
                    const piece = values[1];

                    api.setPinnedTopRowData([piece]);
                });
        }
    }

    ngOnDestroy(): void {
    }

    getRowNodeId(piece: Piece) {
        return piece.id;
    }

    public gridReady(event: GridReadyEvent) {
        this.api.next(event.api);
        this.columnApi.next(event.columnApi);
        event.columnApi.autoSizeAllColumns();
    }

    public gridGroupChanged(event: ColumnGroupOpenedEvent) {
        event.columnApi.autoSizeAllColumns();
    }
}
