import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpostuserPageRoutingModule } from './editpostuser-routing.module';

import { EditpostuserPage } from './editpostuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpostuserPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditpostuserPage]
})
export class EditpostuserPageModule {}
