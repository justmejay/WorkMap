import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardadminPageRoutingModule } from './dashboardadmin-routing.module';

import { DashboardadminPage } from './dashboardadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardadminPageRoutingModule
  ],
  declarations: [DashboardadminPage]
})
export class DashboardadminPageModule {}
