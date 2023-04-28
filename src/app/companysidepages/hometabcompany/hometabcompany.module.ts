import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HometabcompanyPageRoutingModule } from './hometabcompany-routing.module';

import { HometabcompanyPage } from './hometabcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HometabcompanyPageRoutingModule
  ],
  declarations: [HometabcompanyPage]
})
export class HometabcompanyPageModule {}
