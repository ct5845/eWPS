import {Injectable} from '@angular/core';
import {Session} from './session';
import {combineLatest, Observable, of} from 'rxjs';
import {filter, map, mergeMap, shareReplay} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Stroke} from '../strokes/stroke';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    public sessions: Observable<Session[]>;
    private collection: AngularFirestoreCollection;

    constructor(private db: AngularFirestore) {
        this.collection = this.db.collection('sessions', ref => ref.orderBy('details.session.date', 'asc'));

        this.sessions = this.collection.valueChanges()
            .pipe(
                map((sessions: any[]) => {
                    return sessions.map(session => Session.fromStorage(session));
                }),
                shareReplay(1));
    }

    add(session: Session) {
        const data = session.toFirestore();

        this.collection.doc(data.session.id).set(data.session)
            .then(() => {
                data.strokes.forEach(s => {
                    this.collection.doc(`${session.id}`).collection('strokes').doc(s.id).set(s);
                });
            });

        return session;
    }

    get(): Observable<Session[]> {
        return this.sessions;
    }

    find(id: string): Observable<Session> {
        return this.collection.doc(id).valueChanges().pipe(
            filter(session => !!session),
            mergeMap(sessions => combineLatest(of(sessions), this.collection.doc(id).collection('strokes').valueChanges())),
            map((values) => {
                const session = Session.fromStorage(values[0]);

                session.strokes = values[1].map(stroke => Object.assign(new Stroke(), stroke));

                return session;
            }));
    }

    update(session: Session) {
        const data = session.toFirestore();

        this.collection.doc(data.session.id).set(data.session);
    }

    delete(session: Session) {
        this.collection.doc(session.id).delete();
    }
}
