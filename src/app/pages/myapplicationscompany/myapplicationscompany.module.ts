import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyapplicationscompanyPageRoutingModule } from './myapplicationscompany-routing.module';

import { MyapplicationscompanyPage } from './myapplicationscompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyapplicationscompanyPageRoutingModule
  ],
  declarations: [MyapplicationscompanyPage]
})
export class MyapplicationscompanyPageModule {}
