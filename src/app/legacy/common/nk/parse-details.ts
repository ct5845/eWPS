import {parseNKDate} from './parse-date';

export function parseNKSummary(file: File, csv: any[][]): any {
    return {
        file: {
            name: file.name,
            modified: file.lastModified
        },
        session: {
            name: csv[2][1],
            date: parseNKDate(csv[3][1]),
            speedInput: csv[6][1]
        },
        device: {
            name: csv[2][5]
        },
        oarlock: {
            boatId: csv[2][13],
            seat: csv[3][13],
            port: csv[4][13] === 'Port',
            oarLength: csv[5][13],
            inboardLength: csv[6][13]
        }
    };
}
