import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('canvas') canvas: any;
  context: any;
  video: any;
  stream: any;
  image: any;

  constructor() {
   }

  ngOnInit() {
    console.log('in capture component');
    this.video = this.videoElement.nativeElement;
    // this.canvas = this.canvas.nativeElement;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.start();
  }

  capture() {
    this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.image = this.canvas.toDataURL();
    this.video.pause();
  }

  stop() {
    this.stream.getTracks().forEach(track => track.stop());
  }

  start() {
    // Forces camera to be backfacing, therefore breaking desktop view
    // this.initCamera({ video: { facingMode: { exact: 'environment' } }, audio: false });
    this.initCamera({ video: true, audio: false });
  }

  initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.stream = stream;
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }
}
