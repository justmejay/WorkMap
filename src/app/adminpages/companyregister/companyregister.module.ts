import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyregisterPageRoutingModule } from './companyregister-routing.module';

import { CompanyregisterPage } from './companyregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyregisterPageRoutingModule
  ],
  declarations: [CompanyregisterPage]
})
export class CompanyregisterPageModule {}
