import {Stroke} from '../strokes/stroke';
import {DateTime, Duration} from 'luxon';
import {Session} from '../sessions/session';
import {randomString} from '../../shared/random-string';

export class Piece {
    public id: string;
    public sessionId: string;
    public name: string;
    public strokeCount = 0;
    public distance    = 0;
    public average: Stroke;
    public start: number;
    public end: number;
    public from: string;
    public to: string;

    static fromRange(start: number, end: number, session: Session): Piece {
        const strokes = session.strokes;
        const piece   = new Piece(null, session.id);

        piece.start   = start;
        piece.end     = end;
        piece.average = new Stroke();

        piece.from = DateTime.fromISO(session.details.session.date).plus(Duration.fromISO(session.strokes[start].timeElapsed)).toISO();
        piece.to   = DateTime.fromISO(session.details.session.date).plus(Duration.fromISO(session.strokes[end].timeElapsed)).toISO();

        piece.id = `${piece.from}-${piece.to}`;

        if (start === -1 || end === -1 || start >= end) {
            return piece;
        }

        piece.strokeCount = (end - start) + 1;
        piece.distance    = strokes[end].distanceGPS - strokes[start].distanceGPS;

        const strokeCounter = new Stroke();

        for (let i = start; i <= end; i++) {
            piece.average.add(strokes[i], strokeCounter);
        }

        piece.average.average(strokeCounter);

        return piece;
    }

    constructor(id?: string, sessionId?: string) {
        this.id        = id || randomString();
        this.sessionId = sessionId;
    }

    copy(): Piece {
        const piece = Object.assign(new Piece(), this);

        piece.average = piece.average.copy();

        return piece;
    }

    toFirestore(): any {
        const obj: any = {...this};

        obj.average = this.average.toFirestore();

        return obj;
    }
}
