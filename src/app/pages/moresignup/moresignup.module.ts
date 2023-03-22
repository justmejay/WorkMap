import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoresignupPageRoutingModule } from './moresignup-routing.module';

import { MoresignupPage } from './moresignup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoresignupPageRoutingModule
  ],
  declarations: [MoresignupPage]
})
export class MoresignupPageModule {}
