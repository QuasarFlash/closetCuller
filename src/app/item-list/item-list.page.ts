import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, take, map, } from 'rxjs/operators';
import { ClosetService } from '../closet.service';
import { Observable } from 'rxjs';
import { Toggle } from '@ionic/angular';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  type: string;
  items$: Observable<any>;
  toggleCheck = true;
  selectedId: string;
  @ViewChildren('toggle') toggles: QueryList<Toggle>;

  constructor(
    private route: ActivatedRoute,
    private closetSvc: ClosetService,
    ) {
    this.route.paramMap.pipe(
      tap(params => this.type = params.get('type')),
      take(1)
    ).subscribe();
    this.items$ = this.closetSvc.getItems(this.type);
  }

  getDays(mill) {
    let days = (Date.now() - mill) / (1000 * 60 * 60 * 24);
    days = Math.floor(days);
    return days;
  }

  confirm() {
    this.closetSvc.updateItem(this.selectedId);
    this.selectedId = null;
  }

  wearingToday(item, index) {
    if (this.toggleCheck) {
      this.toggleCheck = false;
      this.toggles.forEach((toggle: Toggle, i: number) => {
        if (i !== index) {
          toggle.checked = false;
        } else {
          this.selectedId = toggle.checked ? item.id : null;
        }
      });
    } else {
      return;
    }

    this.toggleCheck = true;
  }

  ngOnInit() {
  }

}
