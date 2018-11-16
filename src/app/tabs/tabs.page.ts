import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CaptureComponent } from '../capture/capture.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClosetService } from '../closet.service';

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
    private closetSvc: ClosetService
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
    this.closetSvc.addItem(pic, type);
  }
}
