import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditjoblistPageRoutingModule } from './editjoblist-routing.module';

import { EditjoblistPage } from './editjoblist.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditjoblistPageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  declarations: [EditjoblistPage]
})
export class EditjoblistPageModule {}
