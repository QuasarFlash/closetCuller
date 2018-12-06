import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  uid: string;
  date: number;
  closetRef: AngularFirestoreCollection;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authSvc: AuthService,
    private http: HttpClient
  ) {
    this.uid = this.authSvc.currentUserID;
    this.date = Date.now();
    this.closetRef = this.afs.collection(`users/${this.uid}/clothes`);
  }

  async addItem(pic, type) {
    const itemRef = await this.closetRef.add({
      last_worn: this.date,
      type: type
    });
    const picRef = this.storage.ref(itemRef.id);
    await picRef.put(pic);
    picRef.getDownloadURL().subscribe(url => {
      itemRef.update({
        picUrl: url,
        id: itemRef.id
      });
    });
  }

  updateItem(id) {
    const url = 'http://localhost:5000/closet-culler/us-central1/api/updateItem';
    const uid = this.authSvc.currentUserID;
    this.http.post(url, {
      itemId: id,
      uid: uid
    }).subscribe(console.log);
  }

  getItems(type) {
    return this.afs
      .collection(`users/${this.uid}/clothes`, ref => {
        return ref.where('type', '==', type);
      })
      .valueChanges();
  }
}
