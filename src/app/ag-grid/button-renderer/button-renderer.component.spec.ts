import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {IconComponent} from '../../icon/icon.component';
import {Component, ViewChild} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ColDef, Column, ColumnApi, GridApi, RowNode} from 'ag-grid-community';
import {ButtonParams, ButtonRendererComponent} from '@alterian/components';
import {ButtonHeaderComponent} from '../button-header/button-header.component';
import {ButtonRendererParams} from './button-renderer-params';

class ButtonTestParams implements ButtonRendererParams {
    value: any;
    valueFormatted: any;
    getValue: () => any;
    setValue: (value: any) => void;
    formatValue: (value: any) => any;
    data: any;
    node: RowNode;
    colDef: ColDef;
    column: Column;
    $scope: any;
    rowIndex: number;
    api: GridApi;
    columnApi: ColumnApi;
    context: any;
    refreshCell: () => void;
    eGridCell: HTMLElement;
    eParentOfValue: HTMLElement;
    addRenderedRowListener: (eventType: string, listener: Function) => void;

    constructor(public buttons: ButtonParams[]) {
    }
}

@Component({
    template: `
        <ad-button-renderer #buttonHeaderCmp>
        </ad-button-renderer>`
})
class TestHostComponent {
    @ViewChild(ButtonRendererComponent) public buttonRendererComponent: ButtonRendererComponent;
}

describe('ButtonHeaderComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let element: any;
    const textButton: ButtonParams = {
        label: 'text',
        color: 'blue'
    };
    const iconButton: ButtonParams = {
        icon: 'add'
    };
    const clickHandler: ButtonParams = {
        label: 'click',
        onClick: (row: RowNode) => {
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatButtonModule, MatIconModule, MatTooltipModule, NoopAnimationsModule],
            declarations: [IconComponent, ButtonRendererComponent, TestHostComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('no params', () => {
        it('shouldnt render anything if no params are supplied', () => {
            expect(element.querySelector('button')).toBeFalsy();
        });
    });

    describe('render button(s)', () => {


        describe('textButton', () => {
            it('should render a button on screen', () => {
                const params = new ButtonTestParams([textButton]);

                component.buttonRendererComponent.agInit(params);
                fixture.detectChanges();

                expect(element.querySelector('button')).toBeTruthy();
            });

            it('should use the material button', () => {
                const params = new ButtonTestParams([textButton]);
                component.buttonRendererComponent.agInit(params);
                fixture.detectChanges();

                const button = element.querySelector('button');

                expect(button.getAttribute('mat-raised-button')).not.toBeNull();
            });

            it('should set the color attribute based on options', () => {
                const params = new ButtonTestParams([textButton]);
                component.buttonRendererComponent.agInit(params);
                fixture.detectChanges();

                const button = element.querySelector('button');

                expect(button.getAttribute('color')).toEqual(textButton.color);
            });

            it('should only render text if theres no icons', () => {
                const params = new ButtonTestParams([textButton]);
                component.buttonRendererComponent.agInit(params);
                fixture.detectChanges();

                const button = element.querySelector('button');

                expect(button.querySelector('ad-icon')).toBeFalsy();
                expect(button.querySelector('mat-icon')).toBeFalsy();
            });

            it('should render text inside span', () => {
                const params = new ButtonTestParams([textButton]);
                component.buttonRendererComponent.agInit(params);
                fixture.detectChanges();

                const button = element.querySelector('button');
                const text = button.querySelector('span');

                expect(text.innerText).toEqual(textButton.label);
            });
        });

        describe('iconButton', () => {
            it('should render a material icon', () => {
                const params = new ButtonTestParams([iconButton]);
                component.buttonRendererComponent.agInit(params);
                fixture.detectChanges();

                const button = element.querySelector('button');
                const icon = button.querySelector('mat-icon');

                expect(icon).toBeTruthy();
                expect(button.getAttribute('icon-only')).toBeTruthy();
                expect(icon.innerText).toEqual(iconButton.icon);
            });
        });

        describe('click handler', () => {
            it('should call click hand;er', () => {
                const params = new ButtonTestParams([clickHandler]);
                component.buttonRendererComponent.agInit(params);
                fixture.detectChanges();

                const spyOnClick = spyOn(clickHandler, 'onClick');

                const button = element.querySelector('button');
                button.click();

                expect(spyOnClick).toHaveBeenCalledTimes(1);
            });
        });

        describe('multiple buttons', () => {
            it('should render multiple buttons', () => {
                const params = new ButtonTestParams([textButton, iconButton, clickHandler]);
                component.buttonRendererComponent.agInit(params);
                fixture.detectChanges();

                const buttons = element.querySelectorAll('button');

                expect(buttons.length).toBe(3);
            });
        });
    });

    describe('afterGuiAttached', () => {
        it('doesnt do anything yet', () => {
            expect(component.buttonRendererComponent.afterGuiAttached()).toBeUndefined();
        });
    });

    describe('refresh', () => {
        it('should change the params correctly', () => {
            const params = new ButtonTestParams([iconButton]);
            const refreshedParams = new ButtonTestParams([textButton]);
            component.buttonRendererComponent.agInit(params);
            component.buttonRendererComponent.refresh(refreshedParams);
            fixture.detectChanges();

            const button = element.querySelector('button');
            const icon = button.querySelector('mat-icon');
            const span = button.querySelector('span');

            expect(icon).toBeNull();
            expect(button.getAttribute('icon-only')).toBeFalsy();
            expect(span).toBeTruthy();
        });
    });
});
