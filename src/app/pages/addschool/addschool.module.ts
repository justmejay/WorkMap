import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddschoolPageRoutingModule } from './addschool-routing.module';

import { AddschoolPage } from './addschool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddschoolPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddschoolPage]
})
export class AddschoolPageModule {}
