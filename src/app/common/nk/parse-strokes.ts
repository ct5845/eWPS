import {DateTime, Duration} from 'luxon';
import {toMillis} from '../../../shared/to-millis';
import {Stroke} from '../../strokes/stroke';

export function parseNKStrokes(csv: any[][], date: string): Stroke[] {
    const strokes: Stroke[] = [];
    const start             = DateTime.fromISO(date);
    let index               = csv.findIndex(line => line[0] === 'Per-Stroke Data:') + 4;

    while (index < csv.length) {
        const line     = csv[index];
        const stroke   = new Stroke();
        const duration = Duration.fromMillis(toMillis(line[3]));

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
        stroke.timeElapsed  = duration.toISO();
        stroke.timestamp    = start.plus(duration).toISO();
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
        stroke.id           = stroke.timestamp;

        strokes.push(stroke);
        index++;
    }

    return strokes;
}
