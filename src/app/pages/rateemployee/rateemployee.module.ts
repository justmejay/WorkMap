import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateemployeePageRoutingModule } from './rateemployee-routing.module';

import { RateemployeePage } from './rateemployee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateemployeePageRoutingModule
  ],
  declarations: [RateemployeePage]
})
export class RateemployeePageModule {}
