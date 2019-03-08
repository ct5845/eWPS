import {Stroke} from '../strokes/stroke';
import {Piece} from '../piece/piece';
import * as shortid from 'shortid';
import {parseNKSummary} from '../common/nk/parse-details';
import {Moment} from 'moment';
import moment from 'moment';
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

    public strokes: Stroke[] = [];
    public pieces?: Piece[] = [];
    public entireSession: Piece;

    static fromCSV(file: File, csv?: any[][]): Session | null {
        const session = new Session();

        session.details = parseNKSummary(file, csv);
        session.name = session.details.session.name;
        session.strokes = parseNKStrokes(csv, session.details.session.date);
        session.entireSession = Piece.fromRange(0, session.strokes.length - 1, session);
        session.entireSession.name = 'Entire Session';

        return session;
    }

    static fromStorage(value: any): Session {
        const session: Session = Object.assign(new Session(value.id), value);

        session.pieces = value.pieces.map(piece => {
            const p = Object.assign(new Piece(), piece);
            p.averages = Object.assign(new Stroke(), piece.averages);

            return p;
        });

        session.entireSession = Object.assign(new Piece(), value.entireSession);
        session.entireSession.averages = Object.assign(new Stroke(), value.entireSession.averages);

        return session;
    }

    constructor(id?: string) {
        this.id = id || shortid.generate();
    }

    toFirestore(): any {
        const session: any = {...this};
        delete session.strokes;

        session.pieces = this.pieces.map(p => p.toFirestore());
        session.entireSession = this.entireSession.toFirestore();

        return session;
    }

    get timestamp(): Moment {
        return moment(this.details.session.date);
    }
}
