import {Injectable} from '@angular/core';
import {Session} from './models/session';
import {Observable, Subscription} from 'rxjs';
import {filter, map, share, shareReplay, tap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {tag} from 'rxjs-spy/operators';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    public sessions: Observable<Session[]>;
    private collection: AngularFirestoreCollection;
    private findMap = new Map<string, Subscription>();

    constructor(private db: AngularFirestore) {
        this.collection = this.db.collection<any>('sessions');

        this.sessions = this.collection.valueChanges()
            .pipe(
                map((sessions: any[]) => {
                    return sessions.map(session => Session.fromStorage(session));
                }),
                shareReplay(1));
    }

    add(session: Session) {
        const data = session.toFirestore();

        this.collection.doc(data.id).set(data);

        return session;
    }

    get(): Observable<Session[]> {
        return this.sessions;
    }

    find(id: string): Observable<Session> {
        return this.collection.doc(id).valueChanges().pipe(
            tag(`getSession`),
            map(s => !s ? null : Session.fromStorage(s)));
    }

    update(session: Session) {
        const data = session.toFirestore();

        this.collection.doc(data.id).set(data);
    }

    delete(session: Session) {
        this.collection.doc(session.id).delete();
    }
}
