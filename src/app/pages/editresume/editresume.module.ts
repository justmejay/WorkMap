import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditresumePageRoutingModule } from './editresume-routing.module';

import { EditresumePage } from './editresume.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditresumePageRoutingModule
  ],
  declarations: [EditresumePage]
})
export class EditresumePageModule {}
