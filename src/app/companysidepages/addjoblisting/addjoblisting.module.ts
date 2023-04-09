import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddjoblistingPageRoutingModule } from './addjoblisting-routing.module';

import { AddjoblistingPage } from './addjoblisting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddjoblistingPageRoutingModule
  ],
  declarations: [AddjoblistingPage]
})
export class AddjoblistingPageModule {}
