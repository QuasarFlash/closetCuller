import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CaptureComponent } from '../capture/capture.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    private modalCtrl: ModalController,
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
      // open modal showing pic
      console.log(data);
    }
  }

  uploadPic(pic) {
    // Create file path using user id
  }
}
