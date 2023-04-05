import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewnotificationPageRoutingModule } from './viewnotification-routing.module';

import { ViewnotificationPage } from './viewnotification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewnotificationPageRoutingModule
  ],
  declarations: [ViewnotificationPage]
})
export class ViewnotificationPageModule {}
