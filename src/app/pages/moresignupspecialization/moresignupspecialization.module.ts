import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoresignupspecializationPageRoutingModule } from './moresignupspecialization-routing.module';

import { MoresignupspecializationPage } from './moresignupspecialization.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MoresignupspecializationPageRoutingModule,
    Ng2SearchPipeModule

  ],
  declarations: [MoresignupspecializationPage]
})
export class MoresignupspecializationPageModule {}
