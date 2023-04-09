import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutcompanyPageRoutingModule } from './aboutcompany-routing.module';

import { AboutcompanyPage } from './aboutcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutcompanyPageRoutingModule
  ],
  declarations: [AboutcompanyPage]
})
export class AboutcompanyPageModule {}
