import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  type: string;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.pipe(
      tap(params => this.type = params.get('type')),
      take(1)
    ).subscribe();
  }

  ngOnInit() {
  }

}
