import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagespagePageRoutingModule } from './messagespage-routing.module';

import { MessagespagePage } from './messagespage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagespagePageRoutingModule
  ],
  declarations: [MessagespagePage]
})
export class MessagespagePageModule {}
