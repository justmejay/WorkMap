import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewuserproilePageRoutingModule } from './viewuserproile-routing.module';

import { ViewuserproilePage } from './viewuserproile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewuserproilePageRoutingModule
  ],
  declarations: [ViewuserproilePage]
})
export class ViewuserproilePageModule {}
