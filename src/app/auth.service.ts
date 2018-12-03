import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public alertController: AlertController
    ) {
      this.afAuth.authState.subscribe(user => {
        this.authState = user;
      });
    }
  
  async presentAlert(error, msg) {
    const alert = await this.alertController.create({
      header: error,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async loginGoogle() {
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

  async login(username,password) {
    try {
      await this.afAuth.auth
        .signInWithEmailAndPassword(username,password)
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
      if (err.code != "") {
        if (err.code == "auth/wrong-password" || err.code == "auth/user-not-found") {
          this.presentAlert("Couldn't login!", "Check your login credentials");
        } else if (err.code == "auth/invalid-email") {
          this.presentAlert("Invalid email!", "Please enter a valid email address");
        }
      }
    }
  }

  async register(username, password){
    try {
      await this.afAuth.auth
        .createUserWithEmailAndPassword(username,password)
        .then(creds => {
          this.afs
            .doc(`users/${creds.user.uid}`)
            .update({})
            .then(() => {
              // update successful (user exists)
            })
            .catch(error => {
              //console.log('Error updating user', error); // (document does not exists)
              this.afs.doc(`users/${creds.user.uid}`).set({});
            });
        });
      this.router.navigate(['']);
    } catch (err) {
      console.error(err);
      if (err.code != "") {
        if (err.code == "auth/email-already-in-use") {
          this.presentAlert("User account exists!", "A user with that email address already exists");
        } else if (err.code == "auth/weak-password") {
          this.presentAlert("Weak password!", "Please use a password that is more than 6 characters");
        } else if (err.code == "auth/invalid-email") {
          this.presentAlert("Invalid email", "Please enter a valid email address");
        }
      }
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
