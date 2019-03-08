import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {IAfterGuiAttachedParams} from 'ag-grid-community';
import {ButtonParams, ButtonRendererParams} from './button-renderer-params';

@Component({
    selector: 'app-button-renderer',
    templateUrl: './button-renderer.component.html',
    styleUrls: ['./button-renderer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonRendererComponent implements AgRendererComponent {
    public params: ButtonRendererParams;

    afterGuiAttached(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: ButtonRendererParams): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        this.params = params;

        return true;
    }

    click(button: ButtonParams) {
        if (!!(button.onClick)) {
            button.onClick(this.params.node);
        }
    }
}
