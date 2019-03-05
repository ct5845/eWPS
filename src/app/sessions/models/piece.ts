import {Stroke} from './stroke';

export class Piece {
    public name: string;
    public id: string;

    public strokes  = 0;
    public distance = 0;

    public average: Stroke;
    public start: number;
    public end: number;

    static fromRange(start: number, end: number, strokes?: Stroke[], id?: string): Piece {
        const piece   = new Piece();
        piece.start   = start;
        piece.end     = end;
        piece.average = new Stroke();
        piece.id      = id;

        if (start === -1 || end === -1 || start >= end) {
            return piece;
        }

        piece.strokes  = (end - start) + 1;
        piece.distance = strokes[end].distanceGPS - strokes[start].distanceGPS;

        const strokeCounter = new Stroke();

        for (let i = start; i <= end; i++) {
            piece.average.add(strokes[i], strokeCounter);
        }

        piece.average.average(strokeCounter);

        return piece;
    }

    copy(): Piece {
        const piece = Object.assign(new Piece(), this);

        piece.average = piece.average.copy();

        return piece;
    }

    toFirestore(): any {
        const obj: any = Object.assign<any, Piece>({}, this);

        obj.average = this.average ? this.average.toFirestore() : null;

        return obj;
    }
}
