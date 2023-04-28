import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagecreatecompanyPageRoutingModule } from './messagecreatecompany-routing.module';

import { MessagecreatecompanyPage } from './messagecreatecompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagecreatecompanyPageRoutingModule
  ],
  declarations: [MessagecreatecompanyPage]
})
export class MessagecreatecompanyPageModule {}
