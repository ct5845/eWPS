import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BoatTypes} from '../../shared/boat-types';
import {CustomValidators} from 'ngx-custom-validators';
import {MatHorizontalStepper} from '@angular/material';

const defaultConfig = {
    race: {
        distance: 2000,
        boatType: null,
        rate: 36,
        seconds: 400
    }
};

@Component({
    selector: 'app-training-speeds',
    templateUrl: './training-speeds.component.html',
    styleUrls: ['./training-speeds.component.scss']
})
export class TrainingSpeedsComponent implements OnInit {
    public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    public raceDistance = new FormControl(null, [Validators.required,
        CustomValidators.number,
        Validators.min(1)]);
    public raceRate = new FormControl(null, [Validators.required,
        CustomValidators.number,
        Validators.min(1)]);
    public raceBoatType = new FormControl(null, [Validators.required]);
    public raceTargetTime = new FormControl(null, [Validators.required]);

    public raceForm = new FormGroup({
        'distance': this.raceDistance,
        'rate': this.raceRate,
        'boatType': this.raceBoatType,
        'seconds': this.raceTargetTime
    });
    public trainForm = new FormGroup({});
    public boatTypes = BoatTypes;

    @ViewChild(MatHorizontalStepper) public m: MatHorizontalStepper;

    constructor(private breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        this.raceTargetTime.statusChanges
            .subscribe(s => {
                console.log('statusChange', s, this.raceTargetTime);
            });
    }
}
