import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcertificationPageRoutingModule } from './addcertification-routing.module';

import { AddcertificationPage } from './addcertification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcertificationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddcertificationPage]
})
export class AddcertificationPageModule {}
