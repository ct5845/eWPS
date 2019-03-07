import {Stroke} from '../strokes/stroke';
import {Piece} from '../piece/piece';
import * as shortid from 'shortid';
import {parseNKSummary} from '../common/nk/parse-details';
import {Moment} from 'moment';
import * as moment from 'moment';
import {parseNKStrokes} from '../common/nk/parse-strokes';

export class Session {
    public details?: {
        session?: {
            name?: string,
            date?: string,
            speedInput?: string
        },
        file?: {
            name?: string,
            modified?: number
        },
        device?: {
            name?: string
        },
        oarlock?: {
            boatId: string,
            seat: number,
            port: boolean,
            oarLength: number,
            inboardLength: number
        }
    };

    public id: string;
    public name: string;

    public strokes?: Stroke[] = [];
    public pieces?: Piece[]   = [];

    static fromCSV(file: File, csv?: any[][]): Session | null {
        const session = new Session();

        session.details = parseNKSummary(file, csv);
        session.name    = session.details.session.name;
        session.strokes = parseNKStrokes(csv, session.details.session.date);

        return session;
    }

    static fromStorage(session: any): Session {
        return Object.assign(new Session(session.id), session);
    }

    constructor(id?: string) {
        this.id = id || shortid.generate();
    }

    toFirestore(): any {
        const session: any = {...this};
        delete session.strokes;
        delete session.pieces;

        const strokes = this.strokes.map(s => s.toFirestore());

        return {session, strokes};
    }

    get timestamp(): Moment {
        return moment(this.details.session.date);
    }
}
