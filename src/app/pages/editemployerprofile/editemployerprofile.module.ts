import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditemployerprofilePageRoutingModule } from './editemployerprofile-routing.module';

import { EditemployerprofilePage } from './editemployerprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditemployerprofilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditemployerprofilePage]
})
export class EditemployerprofilePageModule {}
