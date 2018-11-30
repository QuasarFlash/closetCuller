import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {
  @ViewChild('videoElement') videoElement: any;
  canvas: any;
  context: any;
  video: any;
  stream: any;
  type: string;
  image: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log('in capture component');
    this.video = this.videoElement.nativeElement;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.start();
  }

  capture() {
    this.context.drawImage(this.video, 0, 0);
    this.canvas.toBlob(blob => {
      this.image = blob;
    });
    this.video.pause();
  }

  close() {
    this.stop();
    this.modalCtrl.dismiss(this.image ? this.image : null);
  }

  stop() {
    if (this.stream != null) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  start() {
    // Forces camera to be backfacing, therefore breaking desktop view
    // this.initCamera({ video: { facingMode: { exact: 'environment' } }, audio: false });
    this.initCamera({ video: true, audio: false });
  }

  initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia =
      browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia;

    browser.mediaDevices
      .getUserMedia(config)
      .then(stream => {
        this.stream = stream;
        // this.video.src = window.URL.createObjectURL(stream);
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch(err => {
        console.log('poop, no camera functionality here');
        console.log(err);
      });
  }
}
