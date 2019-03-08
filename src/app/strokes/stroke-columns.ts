import {ValueGetterParams} from 'ag-grid-community';

class StrokeGroup {
    public name?: string;
    public children?: any[];
}

export const STROKE_COLUMNS: StrokeGroup[] = [
    {
        name: 'Details',
        children: [
            {
                field: 'name',
                name: 'Name',
            },
            {
                field: 'from',
                name: 'Time',
                type: 'dateColumn',
            },
            {
                field: 'rate',
                name: 'Rate',
                type: 'numericColumn',
                isAverage: true
            },
            {
                field: 'distance',
                name: 'Distance',
                type: 'numericColumn'
            },
            {
                field: 'strokeCount',
                name: 'Strokes',
                type: 'numericColumn'
            }
        ]
    },
    {
        name: 'Effort',
        children: [
            {
                field: 'work',
                name: 'Work (J)',
                type: 'numericColumn',
                isAverage: true
            },
            {
                field: 'power',
                name: 'Power (w)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            },
            {
                field: 'forceMax',
                name: 'Peak Force (N)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            },
            {
                field: 'forceAvg',
                name: 'Avg. Force (N)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            }
        ]
    },
    {
        name: 'Angles',
        children: [
            {
                field: 'totalAngle',
                name: 'Total/Effective (°)',
                type: 'numericColumn',
                columnGroupShow: 'closed',
                valueGetter: (params: ValueGetterParams) => {
                    return [params.data.averages.totalAngle, params.data.averages.effectiveAngle];
                }
            },
            {
                field: 'catch',
                name: 'Catch/Finish (°)',
                type: 'numericColumn',
                columnGroupShow: 'closed',
                valueGetter: (params: ValueGetterParams) => {
                    return [params.data.averages.catch, params.data.averages.finish];
                }
            },
            {
                field: 'slip',
                name: 'Load/Unload (°)',
                type: 'numericColumn',
                columnGroupShow: 'closed',
                valueGetter: (params: ValueGetterParams) => {
                    return [params.data.averages.slip, params.data.averages.wash];
                }
            },
            {
                field: 'totalAngle',
                name: 'Total (°)',
                type: 'numericColumn',
                isAverage: true,
                width: 100,
                columnGroupShow: 'open'
            },
            {
                field: 'effectiveAngle',
                name: 'Effective (°)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            },
            {
                field: 'catch',
                name: 'Catch (°)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            },
            {
                field: 'slip',
                name: 'Load (°)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            },
            {
                field: 'forceMaxDeg',
                name: 'Peak Force (°)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            },
            {
                field: 'wash',
                name: 'Unload (°)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            },
            {
                field: 'finish',
                name: 'Finish (°)',
                type: 'numericColumn',
                isAverage: true,
                columnGroupShow: 'open'
            }
        ]
    }
];
