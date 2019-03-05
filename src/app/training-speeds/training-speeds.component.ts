import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {until} from 'selenium-webdriver';
import {BoatTypes} from '../../shared/boat-types';
import {CustomValidators} from 'ngx-custom-validators';
import {MatHorizontalStepper} from '@angular/material';
import {TrainingSpeed} from './training-speed';

const defaultConfig = {
    race: {
        distance: 2000,
        boatType: BoatTypes[ BoatTypes.length - 1 ],
        rate: 36,
        seconds: 400
    }
};

@Component({
    selector: 'app-training-speeds',
    templateUrl: './training-speeds.component.html',
    styleUrls: [ './training-speeds.component.scss' ]
})
export class TrainingSpeedsComponent implements OnInit, OnDestroy {
    public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    public raceDistance = new FormControl(null, [ Validators.required,
        CustomValidators.number,
        Validators.min(1) ]);
    public raceRate = new FormControl(null, [ Validators.required,
        CustomValidators.number,
        Validators.min(1) ]);
    public raceBoatType = new FormControl(null, [ Validators.required ]);
    public raceTargetTime = new FormControl(null, [ Validators.required ]);

    public trainingDistance = new FormControl(null, [ Validators.required, CustomValidators.number,
        Validators.min(1) ]);
    public waterTemperature = new FormControl(25, [ Validators.required, CustomValidators.number ]);
    public currentSpeed = new FormControl(0, [ CustomValidators.number ]);
    public windSpeed = new FormControl(0, [ Validators.required, CustomValidators.number ]);
    public windDirection = new FormControl(0, [ Validators.required, CustomValidators.number ]);
    public extraWPS = new FormControl(0, [ Validators.required, CustomValidators.number ]);

    public raceForm = new FormGroup({
        'distance': this.raceDistance,
        'rate': this.raceRate,
        'boatType': this.raceBoatType,
        'seconds': this.raceTargetTime
    });
    public trainingForm = new FormGroup({
        'distance': this.trainingDistance,
        'waterTemperature': this.waterTemperature,
        'windSpeed': this.windSpeed,
        'windDirection': this.windDirection,
        'currentSpeed': this.currentSpeed,
        'extraWPS': this.extraWPS
    });
    public boatTypes = BoatTypes;

    public tableColumns = [ 'rate', 'time', 'split' ];
    public trainingSpeeds: TrainingSpeed[] = [];

    @ViewChild(MatHorizontalStepper) public m: MatHorizontalStepper;

    constructor(private breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        this.raceDistance.setValue(defaultConfig.race.distance);
        this.raceTargetTime.setValue(defaultConfig.race.seconds);
        this.raceRate.setValue(defaultConfig.race.rate);
        this.raceBoatType.setValue(defaultConfig.race.boatType);

        const calculationForm = new FormGroup({
            'race': this.raceForm,
            'train': this.trainingForm
        });

        calculationForm.valueChanges
            .pipe(untilDestroyed(this), debounceTime(250))
            .subscribe(value => {
                if (calculationForm.valid) {
                    this.trainingSpeeds =
                        TrainingSpeed.trainingSpeeds(
                            parseFloat(value.race.distance),
                            parseFloat(value.race.seconds),
                            parseFloat(value.race.rate),
                            value.race.boatType,
                            parseFloat(value.train.distance),
                            parseFloat(value.train.extraWPS),
                            parseFloat(value.train.windSpeed),
                            parseFloat(value.train.windDirection),
                            parseFloat(value.train.currentSpeed),
                            parseFloat(value.train.waterTemperature)
                        );
                }
            });
    }

    ngOnDestroy(): void {
    }
}
