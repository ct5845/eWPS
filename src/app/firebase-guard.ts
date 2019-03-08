import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {auth} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class FirebaseGuard implements CanActivate {
    constructor(private afAuth: AngularFireAuth) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return new Promise<boolean>((resolve, reject) => {
            this.afAuth.user.subscribe(user => {
                if (!!user) {
                    resolve(true);
                } else {
                    this.afAuth.auth
                        .signInWithPopup(new auth.GoogleAuthProvider()).then(res => {
                        resolve(!!res);
                    }, err => {
                        console.log(err);
                        reject(err);
                    });
                }
            });
        });
    }
}
