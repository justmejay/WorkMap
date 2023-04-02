import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcertificationsPageRoutingModule } from './editcertifications-routing.module';

import { EditcertificationsPage } from './editcertifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcertificationsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditcertificationsPage]
})
export class EditcertificationsPageModule {}
