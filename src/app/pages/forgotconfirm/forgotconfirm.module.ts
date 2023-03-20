import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotconfirmPageRoutingModule } from './forgotconfirm-routing.module';

import { ForgotconfirmPage } from './forgotconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotconfirmPageRoutingModule
  ],
  declarations: [ForgotconfirmPage]
})
export class ForgotconfirmPageModule {}
