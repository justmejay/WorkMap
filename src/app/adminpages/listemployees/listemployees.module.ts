import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListemployeesPageRoutingModule } from './listemployees-routing.module';

import { ListemployeesPage } from './listemployees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListemployeesPageRoutingModule
  ],
  declarations: [ListemployeesPage]
})
export class ListemployeesPageModule {}
