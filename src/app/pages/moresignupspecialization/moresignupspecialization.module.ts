import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoresignupspecializationPageRoutingModule } from './moresignupspecialization-routing.module';

import { MoresignupspecializationPage } from './moresignupspecialization.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MoresignupspecializationPageRoutingModule
  ],
  declarations: [MoresignupspecializationPage]
})
export class MoresignupspecializationPageModule {}
