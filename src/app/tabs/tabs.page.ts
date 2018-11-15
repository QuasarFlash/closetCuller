import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CaptureComponent } from '../capture/capture.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    private modalCtrl: ModalController,
    private authSvc: AuthService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    ) {}

  async openCamera() {
    console.log('trying to open camera');
    const modal = await this.modalCtrl.create({
      component: CaptureComponent
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    if (data.data) {
      this.addItem(data.data, 'tshirt');
    }
  }

  async addItem(pic, type) {
    const uid = this.authSvc.currentUserID;
    const closetRef = this.afs.collection(`users/${uid}/clothes`);
    const date = new Date();
    const itemRef = await closetRef.add({
      last_worn: date.getDate(),
      type: type
    });
    const picRef = this.storage.ref(itemRef.id);
    picRef.put(pic);
  }
}
