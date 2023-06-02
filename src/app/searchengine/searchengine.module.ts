import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchenginePageRoutingModule } from './searchengine-routing.module';

import { SearchenginePage } from './searchengine.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchenginePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchenginePage]
})
export class SearchenginePageModule {}
