import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkorderlistPageRoutingModule } from './workorderlist-routing.module';

import { WorkorderlistPage } from './workorderlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkorderlistPageRoutingModule
  ],
  declarations: [WorkorderlistPage]
})
export class WorkorderlistPageModule {}
