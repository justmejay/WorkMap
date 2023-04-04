import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcharPageRoutingModule } from './editchar-routing.module';

import { EditcharPage } from './editchar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcharPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditcharPage]
})
export class EditcharPageModule {}
