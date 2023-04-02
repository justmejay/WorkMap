import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaboutmePageRoutingModule } from './editaboutme-routing.module';

import { EditaboutmePage } from './editaboutme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaboutmePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditaboutmePage]
})
export class EditaboutmePageModule {}
