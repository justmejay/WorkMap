import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddexperiencePageRoutingModule } from './addexperience-routing.module';

import { AddexperiencePage } from './addexperience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddexperiencePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddexperiencePage]
})
export class AddexperiencePageModule {}
