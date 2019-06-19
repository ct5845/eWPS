export class Stroke {
    public id: string;
    public interval = 0;
    public distanceGPS = 0;
    public distanceIMP = 0;
    public timeElapsed: string;
    public timestamp: string;
    public splitGPS = 0;
    public speedGPS = 0;
    public splitIMP = 0;
    public speedIMP = 0;
    public rate = 0;
    public strokeNumber = 0;
    public dpsGPS = 0;
    public dpsIMP = 0;
    public heartRate = 0;
    public power = 0;
    public catch = 0;
    public slip = 0;
    public finish = 0;
    public wash = 0;
    public forceAvg = 0;
    public work = 0;
    public forceMax = 0;
    public forceMaxDeg = 0;
    public latGPS = 0;
    public longGPS = 0;

    public totalAngle = null;
    public effectiveAngle = null;
    public peakAfterCatch = null;
    public peakAfterLoad = null;

    public add(stroke: Stroke, counter?: Stroke) {
        Object.keys(stroke).forEach(key => {
            if (stroke[ key ] !== null) {
                this[ key ] += stroke[ key ];
                counter[ key ] += 1;
            }
        });
    }

    public average(counter: Stroke) {
        Object.keys(counter).forEach(key => {
            this[ key ] = this[ key ] / counter[ key ];
        });
    }

    public toFirestore() {
        return {...this};
    }

    public copy(): Stroke {
        return Object.assign(new Stroke(), this);
    }
}
