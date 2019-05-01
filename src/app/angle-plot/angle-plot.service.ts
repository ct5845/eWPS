import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AnglePlotCompare} from './angle-plot';

@Injectable({
    providedIn: 'root'
})
export class AnglePlotService {
    public plots: Observable<AnglePlotCompare[]>;
    private collection: AngularFirestoreCollection;

    constructor(private db: AngularFirestore) {
        this.collection = this.db.collection('angle-plots',
            ref => ref.orderBy('date', 'asc'));

        this.plots = this.collection.valueChanges()
            .pipe(
                map((plots: any[]) => {
                    return plots.map(plot => AnglePlotCompare.fromDb(plot));
                }),
                shareReplay(1));
    }

    save(plot: AnglePlotCompare) {
        this.collection.doc(plot.id).set({...plot});
    }

    get(): Observable<AnglePlotCompare[]> {
        return this.plots;
    }

    delete(plot: AnglePlotCompare) {
        this.collection.doc(plot.id).delete();
    }

    find(id: string): Observable<AnglePlotCompare> {
        return this.collection.doc(id).valueChanges().pipe(
            map((plot) => {
                if (!plot) {
                    return new AnglePlotCompare(id);
                } else {
                    return AnglePlotCompare.fromDb(plot);
                }
            }));
    }
}
