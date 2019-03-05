import {Stroke} from './stroke';
import {Piece} from './piece';
import {DateTime, Duration} from 'luxon';

export class Session {
    private _name: string;

    public data: any;
    public date: DateTime;

    public strokes: Stroke[];
    public pieces: Piece[];

    public nkName: string;
    public nkDevice: string;

    static fromCSV(csv?: any[][]): Session | null {
        const session = new Session();
        if (session.parseNKSummary(csv)) {
            session.strokes = Stroke.fromCSVData(csv, session.date);

            session.pieces = [];

            return session;
        } else {
            return null;
        }
    }

    static fromStorage(obj: any): Session {
        const session = new Session();

        session.nkName   = obj.nkName;
        session.nkDevice = obj.nkDevice;
        session.date     = DateTime.fromISO(obj.date);
        session.name     = obj._name;

        session.strokes = obj.strokes.map(s => {
            const stroke       = Object.assign(new Stroke(), s);
            stroke.timeElapsed = Duration.fromISO(s.timeElapsed);
            stroke.timestamp   = DateTime.fromISO(s.timestamp);

            return stroke;
        });
        session.pieces  = obj.pieces.map(p => {
            const piece   = Object.assign(new Piece(), p);
            piece.average = Object.assign(new Stroke(), piece.average);

            return piece;
        });

        return session;
    }

    constructor() {
    }

    get name() {
        return this._name || this.nkName;
    }

    set name(value: string) {
        this._name = value;
    }

    get id() {
        return `${this.nkDevice}_${this.date.toString()}`;
    }

    private parseNKSummary(csv: any[][]): boolean {
        const date = csv[3][1];

        this.nkName   = csv[2][1];
        this.date     = DateTime.fromFormat(date, 'dd/MM/yy HH:mm');
        this.nkDevice = csv[2][5];

        return this.date.isValid;
    }

    toFirestore(): any {
        return {
            _name: this.name,
            date: this.date.toJSON(),
            strokes: this.strokes.map(s => s.toFirestore()),
            pieces: this.pieces.map(p => p.toFirestore()),
            nkName: this.nkName,
            nkDevice: this.nkDevice,
            id: this.id
        };
    }
}
