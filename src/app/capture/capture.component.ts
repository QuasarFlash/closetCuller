import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  image: any;

  constructor() {
   }

  ngOnInit() {
    console.log('in capture component');
    this.video = this.videoElement.nativeElement;
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.start();
  }

  capture() {
    this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.image = this.canvas.toDataURL();
    // Stop all video streams.
    // this.video.getVideoTracks().forEach(track => track.stop());
    this.video.pause();
  }

  start() {
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
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }
}
