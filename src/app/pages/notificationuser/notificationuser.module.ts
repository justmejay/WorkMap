import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationuserPageRoutingModule } from './notificationuser-routing.module';

import { NotificationuserPage } from './notificationuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationuserPageRoutingModule
  ],
  declarations: [NotificationuserPage]
})
export class NotificationuserPageModule {}
