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
  items$: any;

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
    this.items$ = this.closetSvc.getItems(this.type);
  }

}
