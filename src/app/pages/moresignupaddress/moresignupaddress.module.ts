import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoresignupaddressPageRoutingModule } from './moresignupaddress-routing.module';

import { MoresignupaddressPage } from './moresignupaddress.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MoresignupaddressPageRoutingModule
  ],
  declarations: [MoresignupaddressPage]
})
export class MoresignupaddressPageModule {}
