import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeworkorderPageRoutingModule } from './employeeworkorder-routing.module';

import { EmployeeworkorderPage } from './employeeworkorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeworkorderPageRoutingModule
  ],
  declarations: [EmployeeworkorderPage]
})
export class EmployeeworkorderPageModule {}
