import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditemployerprofilePageRoutingModule } from './editemployerprofile-routing.module';

import { EditemployerprofilePage } from './editemployerprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditemployerprofilePageRoutingModule
  ],
  declarations: [EditemployerprofilePage]
})
export class EditemployerprofilePageModule {}
