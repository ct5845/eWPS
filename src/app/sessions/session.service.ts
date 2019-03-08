import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Session} from './session';
import {Observable, of} from 'rxjs';
import {filter, map, shareReplay, tap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Stroke} from '../strokes/stroke';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    public sessions: Observable<Session[]>;
    private collection: AngularFirestoreCollection;

    constructor(private db: AngularFirestore,
                private httpClient: HttpClient,
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
            const blob = new Blob([ JSON.stringify(session.strokes) ], {type: 'application/json'});
            const file = new File([ blob ], session.id);

            this.store.ref(`strokes/${session.id}.json`).put(file);

            this.collection.doc(session.id).collection('strokes').doc(session.id)
                .set({
                    strokes: session.strokes.map(s => s.toFirestore())
                });
        });

        return session;
    }

    get(): Observable<Session[]> {
        return this.sessions;
    }

    find(id: string): Observable<Session> {
        return this.collection.doc(id).valueChanges().pipe(
            tap(() => console.log('get session')),
            filter(session => !!session),
            map((session) => {
                return Session.fromStorage(session);
            }));
    }

    strokes(id: string): Observable<any> {
        return this.collection.doc(`${id}/strokes/${id}`).valueChanges().pipe(
            tap(() => console.log('get strokes')),
            filter(doc => !!doc),
            map((doc: any) => doc.strokes.map(s => Object.assign(new Stroke(), s)))
        );
    }

    update(session: Session): Promise<void> {
        return this.collection.doc(session.id).set(session.toFirestore());
    }

    delete(session: Session) {
        this.collection.doc(session.id).delete().then(() => {
            this.store.ref(`strokes/${session.id}.json`).delete();
        });
    }
}
