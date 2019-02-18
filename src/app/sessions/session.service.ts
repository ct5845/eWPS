import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Session} from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private db: AngularFirestore) { }

  get() {
    return this.db.collection('sessions').valueChanges();
  }
}
