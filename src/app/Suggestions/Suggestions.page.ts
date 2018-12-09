import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../closet.service';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-Suggestions',
  templateUrl: 'Suggestions.page.html',
  styleUrls: ['Suggestions.page.scss']
})
export class SuggestionsPage implements OnInit {
  time: string;
  total: number;
  day: string = 'day';
  week: string = 'week';
  month: string = 'month';
  year: string = 'year';
  type: string;
  images$: any;
  DateNow: any = new Date();

  constructor(
    private closetSvc: ClosetService) {
    this.type = 'tshirt';
  }
  ngOnInit() {
    console.log('show suggestions');
    this.time = "day";
    this.total = 0;
    this.displayItems(Event);

  }
  displayItems($event) {
    this.images$ = this.closetSvc.getItems(this.type).pipe(
      map(items => {
        return items.filter((item: any) => {
          var CapDate = new Date(item.last_worn);
          if((this.time === this.day) && this.getDays(CapDate) >= this.total){
            return true;
          }
          else if((this.time == this.week) && this.getWeeks(CapDate) >= this.total){
            return true;

          }
          else if((this.time == this.month) && this.getMonths(CapDate) >= this.total){
            return true;

          }
          else if((this.time == this.year) && this.getYears(CapDate) >= this.total){
            return true;

          }
        })
      })
    );
  }

  TimeRangeItems(imgdate) {
    var full_time = (imgdate);

    var CaptureDate = new Date(full_time);
    var result: any;

    if (this.time == this.day) {
      result = this.getDays(CaptureDate) + " day(s) ago.";
    }
    else if (this.time == this.week) {
      result = this.getWeeks(CaptureDate) + " week(s) ago.";
    }
    else if (this.time == this.month) {
      result = this.getMonths(CaptureDate) + " month(s) ago.";
    }
    else if (this.time == this.year) {
      result = this.getYears(CaptureDate) + " year(s) ago.";
    }
    return result;
  }



  getDays(CapDate) {
    let days = (this.DateNow - CapDate) / (1000 * 60 * 60 * 24);
    days = Math.floor(days);
    return days;
  }
  getWeeks(CapDate) {
    let weeks = (this.DateNow - CapDate) / (1000 * 60 * 60 * 24 * 7);
    weeks = Math.floor(weeks);
    return weeks;
  }
  getMonths(CapDate) {
    let diffMonth = (this.DateNow.getFullYear() - CapDate.getFullYear()) * 12 + (this.DateNow.getMonth() - CapDate.getMonth());
    return diffMonth;
  }
  getYears(CapDate) {
    let diffyear = this.DateNow.getFullYear() - CapDate.getFullYear();
    return diffyear;
  }

}
