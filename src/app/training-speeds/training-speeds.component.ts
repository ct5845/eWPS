import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BoatTypes} from '../../shared/boat-types';

const defaultColours = [
    '#FFD700',
    '#C0C0C0',
    '#cd7f32'
];

const defaultConfig = {
    race: {
        distance: 2000,
        boatType: null,
        rate: 36,
        targets: [
            {seconds: 400, colour: defaultColours[ 0 ]}
        ]
    }
};

@Component({
    selector: 'app-training-speeds',
    templateUrl: './training-speeds.component.html',
    styleUrls: [ './training-speeds.component.scss' ]
})
export class TrainingSpeedsComponent implements OnInit {
    public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    public raceDistance = new FormControl();
    public raceRate = new FormControl();
    public raceBoatType = new FormControl();
    public raceTargetTimes = new FormArray([
        TrainingSpeedsComponent.newTargetTime()
    ]);

    public raceForm = new FormGroup({
        'distance': this.raceDistance,
        'rate': this.raceRate,
        'boatType': this.raceBoatType,
        'targets': this.raceTargetTimes
    });
    public trainForm = new FormGroup({});

    public boatTypes = BoatTypes;
    public defaultColours = defaultColours;

    static newTargetTime(index: number = 0) {
        return new FormGroup({
            colour: new FormControl(),
            seconds: new FormControl()
        });
    }

    constructor(private breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
    }

    addTargetTime() {
        this.raceTargetTimes.push(TrainingSpeedsComponent.newTargetTime());
    }
}
