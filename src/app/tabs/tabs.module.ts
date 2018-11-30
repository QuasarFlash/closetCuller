import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { SuggestionsPageModule } from '../Suggestions/Suggestions.module';
import { HomePageModule } from '../home/home.module';
import { ItemListPageModule } from '../item-list/item-list.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    SuggestionsPageModule,
    ItemListPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
