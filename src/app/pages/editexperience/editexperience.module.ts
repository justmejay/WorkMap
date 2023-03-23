import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditexperiencePageRoutingModule } from './editexperience-routing.module';

import { EditexperiencePage } from './editexperience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditexperiencePageRoutingModule
  ],
  declarations: [EditexperiencePage]
})
export class EditexperiencePageModule {}
