import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, take, } from 'rxjs/operators';
import { ClosetService } from '../closet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  type: string;
  items$: Observable<any>;

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

  ngOnInit() {
  }

}
