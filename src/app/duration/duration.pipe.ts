import {Pipe, PipeTransform} from '@angular/core';
import {Duration} from 'luxon';

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const duration = Duration.fromMillis(value * 1000);
        const milliseconds = duration.shiftTo('minutes', 'seconds', 'milliseconds').toObject().milliseconds.toString();

        return `${duration.toFormat('m:ss')}.${milliseconds.substr(0, 1)}`;
    }
}
