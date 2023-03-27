import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoresignupcPageRoutingModule } from './moresignupc-routing.module';

import { MoresignupcPage } from './moresignupc.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MoresignupcPageRoutingModule
  ],
  declarations: [MoresignupcPage]
})
export class MoresignupcPageModule {}
