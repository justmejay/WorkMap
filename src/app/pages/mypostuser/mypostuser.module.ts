import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypostuserPageRoutingModule } from './mypostuser-routing.module';

import { MypostuserPage } from './mypostuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypostuserPageRoutingModule
  ],
  declarations: [MypostuserPage]
})
export class MypostuserPageModule {}
