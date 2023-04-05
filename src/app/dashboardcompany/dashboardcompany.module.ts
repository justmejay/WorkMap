import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardcompanyPageRoutingModule } from './dashboardcompany-routing.module';

import { DashboardcompanyPage } from './dashboardcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardcompanyPageRoutingModule
  ],
  declarations: [DashboardcompanyPage]
})
export class DashboardcompanyPageModule {}
