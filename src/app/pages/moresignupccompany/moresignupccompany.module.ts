import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoresignupccompanyPageRoutingModule } from './moresignupccompany-routing.module';

import { MoresignupccompanyPage } from './moresignupccompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoresignupccompanyPageRoutingModule
  ],
  declarations: [MoresignupccompanyPage]
})
export class MoresignupccompanyPageModule {}
