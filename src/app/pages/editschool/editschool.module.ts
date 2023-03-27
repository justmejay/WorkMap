import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditschoolPageRoutingModule } from './editschool-routing.module';

import { EditschoolPage } from './editschool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditschoolPageRoutingModule
  ],
  declarations: [EditschoolPage]
})
export class EditschoolPageModule {}
