import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpersonalinfoPageRoutingModule } from './editpersonalinfo-routing.module';

import { EditpersonalinfoPage } from './editpersonalinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpersonalinfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditpersonalinfoPage]
})
export class EditpersonalinfoPageModule {}
