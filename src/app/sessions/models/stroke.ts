import {DateTime, Duration} from 'luxon';
import {toMillis} from '../../../shared/to-millis';


export class Stroke {
    public interval     = 0;
    public distanceGPS  = 0;
    public distanceIMP  = 0;
    public timeElapsed: Duration;
    public timestamp: DateTime;
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

    static fromCSVData(csv: any[][], start: DateTime): Stroke[] {
        const strokes: Stroke[] = [];
        let index               = csv.findIndex(line => line[0] === 'Per-Stroke Data:') + 4;

        while (index < csv.length) {
            const line   = csv[index];
            const stroke = new Stroke();

            if (line.length < 2) {
                break;
            }

            if (line[3] === '---') {
                index++;
                continue;
            }

            stroke.interval     = line[0] === '---' ? null : parseFloat(line[0]);
            stroke.distanceGPS  = line[1] === '---' ? null : parseFloat(line[1]);
            stroke.distanceIMP  = line[2] === '---' ? null : parseFloat(line[2]);
            stroke.timeElapsed  = Duration.fromMillis(toMillis(line[3]));
            stroke.timestamp    = start.plus(stroke.timeElapsed);
            stroke.splitGPS     = line[4] === '---' ? null : parseFloat(line[4]);
            stroke.speedGPS     = line[5] === '---' ? null : parseFloat(line[5]);
            stroke.splitIMP     = line[6] === '---' ? null : parseFloat(line[6]);
            stroke.speedIMP     = line[7] === '---' ? null : parseFloat(line[7]);
            stroke.rate         = line[8] === '---' ? null : parseFloat(line[8]);
            stroke.strokeNumber = line[9] === '---' ? null : parseFloat(line[9]);
            stroke.dpsGPS       = line[10] === '---' ? null : parseFloat(line[10]);
            stroke.dpsIMP       = line[11] === '---' ? null : parseFloat(line[11]);
            stroke.heartRate    = line[12] === '---' ? null : parseFloat(line[12]);
            stroke.power        = line[13] === '---' ? null : parseFloat(line[13]);
            stroke.catch        = line[14] === '---' ? null : parseFloat(line[14]);
            stroke.slip         = line[15] === '---' ? null : parseFloat(line[15]);
            stroke.finish       = line[16] === '---' ? null : parseFloat(line[16]);
            stroke.wash         = line[17] === '---' ? null : parseFloat(line[17]);
            stroke.forceAvg     = line[18] === '---' ? null : parseFloat(line[18]);
            stroke.work         = line[19] === '---' ? null : parseFloat(line[19]);
            stroke.forceMax     = line[20] === '---' ? null : parseFloat(line[20]);
            stroke.forceMaxDeg  = line[21] === '---' ? null : parseFloat(line[21]);
            stroke.latGPS       = line[22] === '---' ? null : parseFloat(line[22]);
            stroke.longGPS      = line[23] === '---' ? null : parseFloat(line[23]);

            strokes.push(stroke);
            index++;
        }

        return strokes;
    }

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
        const obj: any = Object.assign<any, Stroke>({}, this);

        obj.timeElapsed = this.timeElapsed ? this.timeElapsed.toJSON() : null;
        obj.timestamp   = this.timestamp ? this.timestamp.toJSON() : null;

        return obj;
    }

    public copy(): Stroke {
        return Object.assign(new Stroke(), this);
    }
}
