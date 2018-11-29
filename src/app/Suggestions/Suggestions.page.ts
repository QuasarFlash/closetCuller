import { Component } from '@angular/core';

@Component({
  selector: 'app-Suggestions',
  templateUrl: 'Suggestions.page.html',
  styleUrls: ['Suggestions.page.scss']
})
export class SuggestionsPage {
  total: number = 0;
  week: string = "week";
  month: string = "month";
  year: string = "year";
  time: string = this.month;
}
