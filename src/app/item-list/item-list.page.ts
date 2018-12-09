import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, take, map, } from 'rxjs/operators';
import { ClosetService } from '../closet.service';
import { Observable } from 'rxjs';
import { Toggle, Card } from '@ionic/angular';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  type: string;
  items$: Observable<any>;
  toggleCheck = true;
  editing = false;
  selectedId: string;
  selectedIds: Array<String> = [];
  @ViewChildren('toggle') toggles: QueryList<Toggle>;
  @ViewChildren('card') cards: QueryList<Toggle>;

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

  selectItem(item, i) {
    if (this.editing) {
      this.cards.forEach((card: Card, index) => {
        if (index === i) {
          card.color = card.color ? undefined : 'danger';
        }
      });

      this.selectedIds.includes(item.id) ? this.selectedIds.splice(this.selectedIds.indexOf(item.id), 1) : this.selectedIds.push(item.id);
    }

    console.log(this.selectedIds);
  }

  getDays(mill) {
    let days = (Date.now() - mill) / (1000 * 60 * 60 * 24);
    days = Math.floor(days);
    return days;
  }

  confirm() {
    if (this.selectedId) {
      this.closetSvc.updateItem(this.selectedId);
    }
    this.selectedId = null;
    this.editing = false;
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
