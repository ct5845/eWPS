import {Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self} from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs/index';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl} from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
    selector: 'app-duration-input',
    templateUrl: './duration-input.component.html',
    styleUrls: [ './duration-input.component.scss' ],
    providers: [ {provide: MatFormFieldControl, useExisting: DurationInputComponent} ]
})
export class DurationInputComponent implements OnDestroy, MatFormFieldControl<number>, ControlValueAccessor {
    static nextId = 0;

    parts: FormGroup;
    stateChanges = new Subject<void>();
    focused = false;
    errorState = false;
    controlType = 'duration-input';
    @HostBinding('attr.id') id = `duration-input-${DurationInputComponent.nextId++}`;
    @HostBinding('attr.aria-describedby') describedBy = '';

    get empty() {
        const {value: {minutes, seconds}} = this.parts;

        return !minutes && !seconds;
    }

    @HostBinding('class.label-floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    private _placeholder: string;

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    private _disabled = false;

    @Input()
    get value(): number | null {
        // const {value: {minutes, seconds}} = this.parts;
        // if (area.length === 3 && exchange.length === 3 && subscriber.length === 4) {
        //     return new DurationInput(minutes, seconds);
        // }
        return null;
    }

    set value(val: number | null) {
        const minutes = Math.floor((val || 0) / 60);
        const seconds = val - (minutes * 60);

        this.parts.setValue({minutes, seconds});

        this.stateChanges.next();
    }

    constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>,
                @Optional() @Self() public ngControl: NgControl) {
        this.parts = fb.group({
            minutes: null,
            seconds: null
        });

        fm.monitor(elRef, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });

        if (!!this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    }

    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elRef.nativeElement.querySelector('input')!.focus();
        }
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }
}
