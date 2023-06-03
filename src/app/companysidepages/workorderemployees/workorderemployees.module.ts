import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkorderemployeesPageRoutingModule } from './workorderemployees-routing.module';

import { WorkorderemployeesPage } from './workorderemployees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkorderemployeesPageRoutingModule
  ],
  declarations: [WorkorderemployeesPage]
})
export class WorkorderemployeesPageModule {}
