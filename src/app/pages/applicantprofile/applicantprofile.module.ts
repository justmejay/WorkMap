import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantprofilePageRoutingModule } from './applicantprofile-routing.module';

import { ApplicantprofilePage } from './applicantprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantprofilePageRoutingModule
  ],
  declarations: [ApplicantprofilePage]
})
export class ApplicantprofilePageModule {}
