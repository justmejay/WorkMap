import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyreviewPageRoutingModule } from './companyreview-routing.module';

import { CompanyreviewPage } from './companyreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyreviewPageRoutingModule
  ],
  declarations: [CompanyreviewPage]
})
export class CompanyreviewPageModule {}
