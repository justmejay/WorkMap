import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkorderviewPageRoutingModule } from './workorderview-routing.module';

import { WorkorderviewPage } from './workorderview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkorderviewPageRoutingModule
  ],
  declarations: [WorkorderviewPage]
})
export class WorkorderviewPageModule {}
