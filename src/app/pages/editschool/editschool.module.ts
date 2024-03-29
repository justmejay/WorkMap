import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditschoolPageRoutingModule } from './editschool-routing.module';

import { EditschoolPage } from './editschool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditschoolPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditschoolPage]
})
export class EditschoolPageModule {}
