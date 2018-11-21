import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) {
      this.afAuth.authState.subscribe(user => {
        this.authState = user;
      });
    }

  async login() {
    try {
      await this.afAuth.auth
        .signInWithPopup(new auth.GoogleAuthProvider())
        .then(creds => {
          this.afs
            .doc(`users/${creds.user.uid}`)
            .update({})
            .then(() => {
              // update successful (user exists)
            })
            .catch(error => {
              console.log('Error updating user', error); // (document does not exists)
              this.afs.doc(`users/${creds.user.uid}`).set({});
            });
        });
      this.router.navigate(['']);
    } catch (err) {
      console.error(err);
    }
  }

  get authenticated(): boolean {
    return this.authState  !== null;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  get currentUser() {
    return this.authState ? this.authState : null;
  }

  get currentUserObservable() {
    return this.afAuth.authState;
  }

  get currentUserID() {
    return this.authState ? this.authState.uid : null;
  }
}
