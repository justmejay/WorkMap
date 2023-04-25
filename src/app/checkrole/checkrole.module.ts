import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckrolePageRoutingModule } from './checkrole-routing.module';

import { CheckrolePage } from './checkrole.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckrolePageRoutingModule
  ],
  declarations: [CheckrolePage]
})
export class CheckrolePageModule {}
