import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpostPageRoutingModule } from './addpost-routing.module';

import { AddpostPage } from './addpost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpostPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddpostPage]
})
export class AddpostPageModule {}
