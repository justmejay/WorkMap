import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SepublicPageRoutingModule } from './sepublic-routing.module';

import { SepublicPage } from './sepublic.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SepublicPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SepublicPage]
})
export class SepublicPageModule {}
