import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypostcompanyPageRoutingModule } from './mypostcompany-routing.module';

import { MypostcompanyPage } from './mypostcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypostcompanyPageRoutingModule
  ],
  declarations: [MypostcompanyPage]
})
export class MypostcompanyPageModule {}
