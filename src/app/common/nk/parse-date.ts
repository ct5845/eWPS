import moment from 'moment';

export function  parseNKDate(dateString: string): string {
    const date = moment(dateString, ['DD/MM/YYYY  HH:mm:ss', 'DD/MM/YYYY  hh:mm:ssa', 'MM/DD/YYYY  hh:mm:ssa', 'MM/DD/YYYY  HH:mm:ss']);

    if (!date.isValid()) {
        console.error('Cant Parse Date', dateString, date);
    }

    return date.toISOString();
}
