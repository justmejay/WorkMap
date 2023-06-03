import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddworkorderPageRoutingModule } from './addworkorder-routing.module';

import { AddworkorderPage } from './addworkorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddworkorderPageRoutingModule
  ],
  declarations: [AddworkorderPage]
})
export class AddworkorderPageModule {}
