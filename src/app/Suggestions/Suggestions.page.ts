import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../closet.service';

@Component({
  selector: 'app-Suggestions',
  templateUrl: 'Suggestions.page.html',
  styleUrls: ['Suggestions.page.scss']
})
export class SuggestionsPage implements OnInit {
  time: string;
  total: number;
  week: 'week';
  month: 'month';
  year: 'year';
  type: string;
  images: Array<string> = [];

  constructor(
    private closetSvc: ClosetService) {
      this.type = 'tshirt';
    this.time = this.week;
  }
  ngOnInit() {
    console.log('show suggestions');
    this.displayItems(Event);
  }
  displayItems($event) {
    this.closetSvc.getItems(this.type).subscribe(data => {
      data.forEach( (value: any) => {
      console.log(value.picUrl);
        try {
          this.images.push(value.picUrl);
        } catch (err) {
          console.log('No image here');
        }
    });
  });
  }

}
