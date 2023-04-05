import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagecreatePageRoutingModule } from './messagecreate-routing.module';

import { MessagecreatePage } from './messagecreate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagecreatePageRoutingModule
  ],
  declarations: [MessagecreatePage]
})
export class MessagecreatePageModule {}
