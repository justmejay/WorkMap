import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaboutcompanyPageRoutingModule } from './editaboutcompany-routing.module';

import { EditaboutcompanyPage } from './editaboutcompany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaboutcompanyPageRoutingModule
  ],
  declarations: [EditaboutcompanyPage]
})
export class EditaboutcompanyPageModule {}
