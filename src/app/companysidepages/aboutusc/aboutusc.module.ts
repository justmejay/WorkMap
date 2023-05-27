import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutuscPageRoutingModule } from './aboutusc-routing.module';

import { AboutuscPage } from './aboutusc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutuscPageRoutingModule
  ],
  declarations: [AboutuscPage]
})
export class AboutuscPageModule {}
