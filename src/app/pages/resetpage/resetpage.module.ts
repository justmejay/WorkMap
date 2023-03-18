import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpagePageRoutingModule } from './resetpage-routing.module';

import { ResetpagePage } from './resetpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetpagePageRoutingModule
  ],
  declarations: [ResetpagePage]
})
export class ResetpagePageModule {}
