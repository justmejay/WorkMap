import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyapplicationsjobPageRoutingModule } from './myapplicationsjob-routing.module';

import { MyapplicationsjobPage } from './myapplicationsjob.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyapplicationsjobPageRoutingModule
  ],
  declarations: [MyapplicationsjobPage]
})
export class MyapplicationsjobPageModule {}
