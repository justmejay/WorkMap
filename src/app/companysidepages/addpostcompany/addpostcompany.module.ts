import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpostcompanyPageRoutingModule } from './addpostcompany-routing.module';

import { AddpostcompanyPage } from './addpostcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpostcompanyPageRoutingModule
  ],
  declarations: [AddpostcompanyPage]
})
export class AddpostcompanyPageModule {}
