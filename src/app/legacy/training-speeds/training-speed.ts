import {BoatType} from '../../../shared/boat-types';

const ct = 0.0059;

export class TrainingSpeed {

    static trainingSpeeds(
        raceDistance: number,
        raceTime: number,
        raceRate: number,
        boatType: BoatType,
        trainingDistance: number,
        extraWPS: number,
        windSpeed: number,
        windDirection: number,
        riverSpeed: number,
        riverTemperature: number
    ): TrainingSpeed[] {
        const trainingSpeeds = [];
        const raceSpeed = raceDistance / raceTime;
        const speedDifference = Math.pow(1 + (extraWPS / 100), 1 / 3) -
            ct * (5 - Math.pow(riverTemperature, 0.5)) -
            1 + boatType.speedMultiplier(windSpeed, windDirection);

        for (let i = 16; i < 48; i++) {
            trainingSpeeds.push(
                TrainingSpeed.trainingSpeed(i, raceSpeed, speedDifference, raceRate, trainingDistance, riverSpeed));
        }

        return trainingSpeeds;
    }

    static trainingSpeed(rate: number,
                         raceSpeed: number,
                         speedDifference: number,
                         raceRate: number,
                         trainingDistance: number,
                         riverSpeed: number): TrainingSpeed {
        const rateSpeed = raceSpeed * Math.pow(rate / raceRate, 1 / 3) * (1 + speedDifference) + riverSpeed;
        const rateTime = trainingDistance / rateSpeed;

        return new TrainingSpeed(rate, rateTime, trainingDistance);
    }

    constructor(public rate: number,
                public time: number,
                private distance: number) {
    }

    public get split() {
        return this.time * (500 / this.distance);
    }
}
