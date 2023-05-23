import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpostcompanyPageRoutingModule } from './editpostcompany-routing.module';

import { EditpostcompanyPage } from './editpostcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpostcompanyPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditpostcompanyPage]
})
export class EditpostcompanyPageModule {}
