import {Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self} from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs/index';
import {ControlValueAccessor, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {CustomValidators} from 'ngx-custom-validators';

@Component({
    selector: 'app-duration-input',
    templateUrl: './duration-input.component.html',
    styleUrls: ['./duration-input.component.scss'],
    providers: [{provide: MatFormFieldControl, useExisting: DurationInputComponent}]
})
export class DurationInputComponent implements OnDestroy, MatFormFieldControl<number>, ControlValueAccessor {
    static nextId = 0;

    public minutesControl = new FormControl(null, [
        Validators.required, CustomValidators.min(0), CustomValidators.max(59), CustomValidators.number]);
    public secondsControl = new FormControl(null, [
        Validators.required, CustomValidators.min(0), CustomValidators.max(59),
        Validators.minLength(2),
        CustomValidators.number]);
    public form = new FormGroup({minutes: this.minutesControl, seconds: this.secondsControl});

    stateChanges = new Subject<void>();
    focused = false;
    errorState = false;
    controlType = 'duration-input';
    @HostBinding('attr.id') id = `duration-input-${DurationInputComponent.nextId++}`;
    @HostBinding('attr.aria-describedby') describedBy = '';

    get empty() {
        const {value: {minutes, seconds}} = this.form;

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
        const {value: {minutes, seconds}} = this.form;

        console.log('getValue', minutes, seconds);

        return null;
    }

    set value(val: number | null) {
        console.log('setValue', val);
        const minutes = Math.floor((val || 0) / 60);
        let seconds = val - (minutes * 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        this.form.setValue(val ? {minutes, seconds} : {minutes: null, seconds: null});

        this.stateChanges.next();
    }

    constructor(private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>,
                @Optional() @Self() public ngControl: NgControl) {
        fm.monitor(elRef, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });

        if (!!this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        this.form.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(val => {
                this.stateChanges.next();
            });
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
        console.log('writeValue', obj);
        this.value = obj;
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }
}
