import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditworkorderPageRoutingModule } from './editworkorder-routing.module';

import { EditworkorderPage } from './editworkorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditworkorderPageRoutingModule
  ],
  declarations: [EditworkorderPage]
})
export class EditworkorderPageModule {}
