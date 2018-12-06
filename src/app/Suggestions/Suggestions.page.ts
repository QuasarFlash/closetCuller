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
  day:  string = 'day';
  week: string = 'week';
  month:  string = 'month';
  year:  string = 'year';
  type: string;
  items$: any;
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
    this.items$ = this.closetSvc.getItems(this.type);
  }
  TimeRangeItems(imgdate){
    
    var full_time = (imgdate.seconds * 1000) + imgdate.nanoseconds/1000;

    var CaptureDate = new Date(full_time);
    var result: any;
    
    if (this.time == this.day){
      result = this.getDays(full_time) + " day(s) ago.";
    }
    else if (this.time == this.week){
      result = this.getWeeks(full_time) + " week(s) ago.";
    }
    else if (this.time == this.month){
      result = this.getMonths(CaptureDate) + " month(s) ago.";
    }
    else if(this.time == this.year){
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
    let diffMonth = (this.DateNow.getFullYear() - CapDate.getFullYear())*12 + (this.DateNow.getMonth() - CapDate.getMonth());
    return diffMonth;
  }
  getYears(CapDate) {
    let diffyear = this.DateNow.getFullYear() - CapDate.getFullYear();
    return diffyear;
  }
}
