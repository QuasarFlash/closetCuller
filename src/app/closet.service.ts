import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  uid: string;
  date: Date;
  closetRef: AngularFirestoreCollection;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authSvc: AuthService
  ) {
    this.uid = this.authSvc.currentUserID;
    this.date = new Date();
    this.closetRef = this.afs.collection(`users/${this.uid}/clothes`);
  }

  async addItem(pic, type) {
    const itemRef = await this.closetRef.add({
      last_worn: this.date.getDate(),
      type: type
    });
    const picRef = this.storage.ref(itemRef.id);
    picRef.put(pic);
  }

  getItems(type) {
    return this.afs.collection(`users/${this.uid}/clothes`, ref => {
      return ref.where('type', '==', type);
    }).valueChanges();
  }
}
