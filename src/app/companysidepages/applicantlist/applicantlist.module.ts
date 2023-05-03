import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantlistPageRoutingModule } from './applicantlist-routing.module';

import { ApplicantlistPage } from './applicantlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantlistPageRoutingModule
  ],
  declarations: [ApplicantlistPage]
})
export class ApplicantlistPageModule {}
