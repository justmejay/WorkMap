import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewemployeePageRoutingModule } from './viewemployee-routing.module';

import { ViewemployeePage } from './viewemployee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewemployeePageRoutingModule
  ],
  declarations: [ViewemployeePage]
})
export class ViewemployeePageModule {}
