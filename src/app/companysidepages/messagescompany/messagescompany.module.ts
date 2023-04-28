import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagescompanyPageRoutingModule } from './messagescompany-routing.module';

import { MessagescompanyPage } from './messagescompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagescompanyPageRoutingModule
  ],
  declarations: [MessagescompanyPage]
})
export class MessagescompanyPageModule {}
