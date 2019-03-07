export class Stroke {
    public id: string;
    public interval     = 0;
    public distanceGPS  = 0;
    public distanceIMP  = 0;
    public timeElapsed: string;
    public timestamp: string;
    public splitGPS     = 0;
    public speedGPS     = 0;
    public splitIMP     = 0;
    public speedIMP     = 0;
    public rate         = 0;
    public strokeNumber = 0;
    public dpsGPS       = 0;
    public dpsIMP       = 0;
    public heartRate    = 0;
    public power        = 0;
    public catch        = 0;
    public slip         = 0;
    public finish       = 0;
    public wash         = 0;
    public forceAvg     = 0;
    public work         = 0;
    public forceMax     = 0;
    public forceMaxDeg  = 0;
    public latGPS       = 0;
    public longGPS      = 0;

    public get totalAngle() {
        return -1 * this.catch + this.finish;
    }

    public get effectiveAngle() {
        return this.totalAngle - this.slip - this.wash;
    }

    public static get getWorkData(): any[] {
        return [
            {field: 'rate', name: 'Rate'},
            {field: 'work', name: 'Work (J)'},
            {field: 'power', name: 'Power (w)'},
            {field: 'forceMax', name: 'Peak Force (N)'},
            {field: 'forceAvg', name: 'Avg. Force (N)'}
        ];
    }

    public static get getAngleData(): any[] {
        return [
            {field: 'catch', name: 'Catch (°)'},
            {field: 'slip', name: 'Load (°)'},
            {field: 'forceMaxDeg', name: 'Peak Force (°)'},
            {field: 'wash', name: 'Unload (°)'},
            {field: 'finish', name: 'Finish (°)'}
        ];
    }

    public add(stroke: Stroke, counter?: Stroke) {
        Object.keys(stroke).forEach(key => {
            if (stroke[key] !== null) {
                this[key] += stroke[key];
                counter[key] += 1;
            }
        });
    }

    public scale(scale: number) {
        this.rate *= scale;
        this.catch *= scale;
        this.slip *= scale;
        this.forceMaxDeg *= scale;
        this.wash *= scale;
        this.finish *= scale;
        this.work *= scale;
        this.power *= scale;
        this.forceMax *= scale;
        this.forceAvg *= scale;
    }

    public average(counter: Stroke) {
        Object.keys(counter).forEach(key => {
            this[key] = this[key] / counter[key];
        });
    }

    public toFirestore() {
        return {...this};
    }

    public copy(): Stroke {
        return Object.assign(new Stroke(), this);
    }
}
