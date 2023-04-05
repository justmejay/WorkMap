import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcompanydetailsPageRoutingModule } from './editcompanydetails-routing.module';

import { EditcompanydetailsPage } from './editcompanydetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcompanydetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditcompanydetailsPage]
})
export class EditcompanydetailsPageModule {}
