import {Injectable} from '@angular/core';
import {Session} from './session';
import {Observable} from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Stroke} from '../strokes/stroke';
import {chunkArray} from '../../shared/chunk-array';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    public sessions: Observable<Session[]>;
    private collection: AngularFirestoreCollection;

    constructor(private db: AngularFirestore) {
        this.collection = this.db.collection('sessions',
            ref => ref.orderBy('details.session.date', 'asc'));

        this.sessions = this.collection.valueChanges()
            .pipe(
                map((sessions: any[]) => {
                    return sessions.map(session => Session.fromStorage(session));
                }),
                shareReplay(1));
    }

    add(session: Session): Promise<void[]> {
        return this.collection.doc(session.id).set(session.toFirestore()).then(() => {
            const promises = chunkArray(session.strokes.map(s => s.toFirestore()), 200).map((strokes: Stroke[]) => {
                return this.collection.doc(session.id).collection('strokes').doc(strokes[0].timestamp).set({
                    id: strokes[0].timestamp,
                    data: strokes
                });
            });

            return Promise.all(promises);
        });
    }

    get(): Observable<Session[]> {
        return this.sessions;
    }

    getByDayAndGroup(): Observable<Map<string, Map<string, Session[]>>> {
        return this.get().pipe(
            map(sessions => {
                const allSessions = new Map<string, Map<string, Session[]>>();

                sessions.forEach((session) => {
                    const timestampKey = session.timestamp.format('YYYY-MM-DD');

                    if (allSessions.has(timestampKey)) {
                        const todaysSession = allSessions.get(timestampKey);

                        if (todaysSession.has(session.group)) {
                            const orderedSessions: Session[] = [...todaysSession.get(session.group), session].sort((s1, s2) => {
                                return s2.details.oarlock.seat - s1.details.oarlock.seat;
                            });

                            todaysSession.set(session.group, orderedSessions);
                        } else {
                            todaysSession.set(session.group, [session]);
                        }
                    } else {
                        const todaysSession = new Map<string, Session[]>();

                        todaysSession.set(session.group, [session]);

                        allSessions.set(timestampKey, todaysSession);
                    }
                });

                return allSessions;
            })
        );
    }

    find(id: string): Observable<Session> {
        return this.collection.doc(id).valueChanges().pipe(
            filter(session => !!session),
            map((session) => {
                return Session.fromStorage(session);
            }));
    }

    strokes(id: string): Observable<any> {
        return this.collection.doc(`${id}`)
            .collection('strokes', ref => ref.orderBy('id', 'asc'))
            .valueChanges()
            .pipe(
                filter(doc => !!doc),
                map((docs: any[]) => {
                    return docs
                        .map(d => d.data)
                        .flat()
                        .map(s => Object.assign(new Stroke(), s));
                }),
                shareReplay(1)
            );
    }

    update(session: Session): Promise<void> {
        return this.collection.doc(session.id).set(session.toFirestore());
    }

    delete(session: Session) {
        this.collection.doc(session.id).delete();
    }
}
