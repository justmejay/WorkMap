import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateemployeeeditPageRoutingModule } from './rateemployeeedit-routing.module';

import { RateemployeeeditPage } from './rateemployeeedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateemployeeeditPageRoutingModule
  ],
  declarations: [RateemployeeeditPage]
})
export class RateemployeeeditPageModule {}
