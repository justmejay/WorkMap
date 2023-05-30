import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacypolicycompanyPageRoutingModule } from './privacypolicycompany-routing.module';

import { PrivacypolicycompanyPage } from './privacypolicycompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacypolicycompanyPageRoutingModule
  ],
  declarations: [PrivacypolicycompanyPage]
})
export class PrivacypolicycompanyPageModule {}
