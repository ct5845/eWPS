import {Injectable} from '@angular/core';
import {Session} from './session';
import {Observable} from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    public sessions: Observable<Session[]>;
    private collection: AngularFirestoreCollection;

    constructor(private db: AngularFirestore,
                private store: AngularFireStorage) {
        this.collection = this.db.collection('sessions',
            ref => ref.orderBy('details.session.date', 'asc'));

        this.sessions = this.collection.valueChanges()
            .pipe(
                map((sessions: any[]) => {
                    return sessions.map(session => Session.fromStorage(session));
                }),
                shareReplay(1));
    }

    add(session: Session) {
        this.collection.doc(session.id).set(session.toFirestore()).then(() => {
            const blob = new Blob([JSON.stringify(session.strokes)], {type: 'application/json'});
            const file = new File([blob], session.id);

            this.store.ref(`strokes/${session.id}.json`).put(file);
        });

        return session;
    }

    get(): Observable<Session[]> {
        return this.sessions;
    }

    find(id: string): Observable<Session> {
        return this.collection.doc(id).valueChanges().pipe(
            filter(session => !!session),
            map((session) => {
                return Session.fromStorage(session);
            }));
    }

    update(session: Session) {
        this.collection.doc(session.id).set(session.toFirestore());
    }

    delete(session: Session) {
        this.collection.doc(session.id).delete().then(() => {
            this.store.ref(`strokes/${session.id}.json`).delete();
        });
    }
}
