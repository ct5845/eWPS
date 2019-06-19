import {ICellRendererParams, RowNode} from 'ag-grid-community';

export interface ButtonRendererParams extends ICellRendererParams {
    buttons?: ButtonParams[];
}

export interface ButtonParams {
    label?: string;
    icon?: string;
    color?: string;
    onClick?: (row?: RowNode) => any;
    show?: (row?: RowNode) => boolean;
    tooltip?: string;
}
