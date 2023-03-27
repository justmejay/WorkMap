import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyprofilePageRoutingModule } from './companyprofile-routing.module';

import { CompanyprofilePage } from './companyprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyprofilePageRoutingModule
  ],
  declarations: [CompanyprofilePage]
})
export class CompanyprofilePageModule {}
