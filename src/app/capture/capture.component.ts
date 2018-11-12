import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {
  @ViewChild('videoElement') videoElement: any;
  video: any;

  constructor() {
   }

  ngOnInit() {
    console.log('in capture component');
    this.video = this.videoElement.nativeElement;
  }

  start() {
    this.initCamera({ video: { facingMode: { exact: 'environment' } }, audio: false });
  }

  initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }
}
