import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditworkordersinglePageRoutingModule } from './editworkordersingle-routing.module';

import { EditworkordersinglePage } from './editworkordersingle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditworkordersinglePageRoutingModule
  ],
  declarations: [EditworkordersinglePage]
})
export class EditworkordersinglePageModule {}
