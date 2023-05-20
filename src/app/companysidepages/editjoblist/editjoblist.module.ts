import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditjoblistPageRoutingModule } from './editjoblist-routing.module';

import { EditjoblistPage } from './editjoblist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditjoblistPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditjoblistPage]
})
export class EditjoblistPageModule {}
