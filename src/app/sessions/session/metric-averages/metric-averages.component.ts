import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, ReplaySubject} from 'rxjs';
import {Piece} from '../../../piece/piece';
import {ColDef, GridReadyEvent, GridApi, ValueFormatterParams, ColumnApi, RowNode} from 'ag-grid-community';
import {Stroke} from '../../../strokes/stroke';
import {DecimalPipe} from '@angular/common';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-metric-averages',
    templateUrl: './metric-averages.component.html',
    styleUrls: ['./metric-averages.component.scss']
})
export class MetricAveragesComponent implements OnInit, OnDestroy {
    @Input() public pieces: Observable<Piece[]>;

    public columnDefs: ColDef[];

    private api        = new ReplaySubject<GridApi>(1);
    private columnApi  = new ReplaySubject<ColumnApi>(1);
    private numberPipe = new DecimalPipe('en-GB');

    constructor() {
    }

    ngOnInit() {
        const numOfStrokes = {field: 'strokeCount', headerName: 'Strokes', type: 'numericColumn'};
        const distance     = {
            field: 'distance',
            headerName: 'Distance (m)',
            type: 'numericColumn',
            valueFormatter: (params: ValueFormatterParams) => this.numberPipe.transform(params.value, '1.0-0')
        };

        const workColumns = Stroke.getWorkData.map(col => {
            return {
                field: `average.${col.field}`,
                headerName: col.name,
                type: 'numericColumn',
                valueFormatter: (params: ValueFormatterParams) => this.numberPipe.transform(params.value, '1.0-0')
            };
        });

        const angleColumns = Stroke.getAngleData.map(col => {
            return {
                field: `average.${col.field}`,
                headerName: col.name,
                type: 'numericColumn',
                valueFormatter: (params: ValueFormatterParams) => this.numberPipe.transform(params.value, '1.0-0')
            };
        });

        this.columnDefs = [numOfStrokes, distance, ...workColumns, ...angleColumns];

        combineLatest(this.api, this.columnApi, this.pieces)
            .pipe()
            .subscribe(values => {
                const api       = values[0];
                const columnApi = values[1];
                const pieces    = values[2];

                api.setRowData(pieces);
                columnApi.autoSizeAllColumns();
            });
    }

    ngOnDestroy(): void {
    }

    getRowNodeId(piece: Piece) {
        return piece.id;
    }

    public gridReady(event: GridReadyEvent) {
        this.api.next(event.api);
        this.columnApi.next(event.columnApi);
    }
}
