import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditjoblistingPageRoutingModule } from './editjoblisting-routing.module';

import { EditjoblistingPage } from './editjoblisting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditjoblistingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditjoblistingPage]
})
export class EditjoblistingPageModule {}
