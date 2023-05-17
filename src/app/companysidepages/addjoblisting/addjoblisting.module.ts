import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddjoblistingPageRoutingModule } from './addjoblisting-routing.module';

import { AddjoblistingPage } from './addjoblisting.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddjoblistingPageRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
  declarations: [AddjoblistingPage]
})
export class AddjoblistingPageModule {}
