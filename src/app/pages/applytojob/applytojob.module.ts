import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplytojobPageRoutingModule } from './applytojob-routing.module';

import { ApplytojobPage } from './applytojob.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplytojobPageRoutingModule
  ],
  declarations: [ApplytojobPage]
})
export class ApplytojobPageModule {}
