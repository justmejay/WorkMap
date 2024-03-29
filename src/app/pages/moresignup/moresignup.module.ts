import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoresignupPageRoutingModule } from './moresignup-routing.module';

import { MoresignupPage } from './moresignup.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MoresignupPageRoutingModule
  ],
  declarations: [MoresignupPage]
})
export class MoresignupPageModule {}
