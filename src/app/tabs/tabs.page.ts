import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CaptureComponent } from '../capture/capture.component';
import { ClosetService } from '../closet.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    private modalCtrl: ModalController,
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

  private addItem(pic, type) {
    this.closetSvc.addItem(pic, type);
  }
}
