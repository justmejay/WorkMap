import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewemployerprofilePageRoutingModule } from './viewemployerprofile-routing.module';

import { ViewemployerprofilePage } from './viewemployerprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewemployerprofilePageRoutingModule
  ],
  declarations: [ViewemployerprofilePage]
})
export class ViewemployerprofilePageModule {}
