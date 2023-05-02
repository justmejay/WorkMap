import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageviewcompanyPageRoutingModule } from './messageviewcompany-routing.module';

import { MessageviewcompanyPage } from './messageviewcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageviewcompanyPageRoutingModule
  ],
  declarations: [MessageviewcompanyPage]
})
export class MessageviewcompanyPageModule {}
