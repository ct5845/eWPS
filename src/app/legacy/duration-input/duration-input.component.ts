import {Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, Optional, Self} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {ControlValueAccessor, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {CustomValidators} from 'ngx-custom-validators';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-duration-input',
    templateUrl: './duration-input.component.html',
    styleUrls: [ './duration-input.component.scss' ],
    providers: [ {provide: MatFormFieldControl, useExisting: DurationInputComponent} ]
})
export class DurationInputComponent implements OnDestroy, MatFormFieldControl<number>, ControlValueAccessor {
    static nextId = 0;

    private _placeholder = '';
    private _disabled = false;
    private _required = false;

    public minutesControl = new FormControl(null, [
        Validators.required, CustomValidators.min(0), CustomValidators.max(59), CustomValidators.number ]);
    public secondsControl = new FormControl(null, [
        Validators.required, CustomValidators.min(0), CustomValidators.max(59),
        Validators.minLength(2),
        CustomValidators.number ]);
    public form = new FormGroup({minutes: this.minutesControl, seconds: this.secondsControl});

    public stateChanges = new Subject<void>();
    public focused = false;
    public controlType = 'duration-input';
    @HostBinding('attr.id') public id = `duration-input-${DurationInputComponent.nextId++}`;
    @HostBinding('attr.aria-describedby') public describedBy = '';

    @HostListener('focusout') public propagateTouch: () => any;

    get empty() {
        const values = this.form.value;

        return !values.seconds && !values.minutes;
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

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get value(): number | null {
        if (this.form.valid) {
            const values = this.form.value;
            return parseInt(values.minutes, 10) * 60 + parseInt(this.form.getRawValue().seconds, 10);
        } else {
            return null;
        }
    }

    set value(val: number | null) {
        this.form.setValue(this.secondsToDuration(val));
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.form.dirty && this.form.invalid;
    }

    constructor(private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>,
                @Optional() @Self() public ngControl: NgControl) {
        fm.monitor(elRef, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });

        if (!!this.ngControl) {
            this.ngControl.valueAccessor = this;
            ngControl.valueAccessor = this;
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

    writeValue(value: number): void {
        const duration = this.secondsToDuration(value);
        this.form.setValue(duration, {emitEvent: false});
    }

    registerOnChange(onChange: (value: number) => void): void {
        this.form.valueChanges
            .pipe(untilDestroyed(this),
                map(() => {
                    return this.value;
                }))
            .subscribe(onChange);
    }

    registerOnTouched(fn: any): void {
        this.propagateTouch = fn;
    }

    private secondsToDuration(value: number): any {
        if (value) {
            const minutes = Math.floor(value / 60);
            const seconds = value - (minutes * 60);

            return {minutes, seconds};
        } else {
            return {minutes: null, seconds: null};
        }
    }
}
