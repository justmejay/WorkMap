import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpreferredoptionPageRoutingModule } from './editpreferredoption-routing.module';

import { EditpreferredoptionPage } from './editpreferredoption.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpreferredoptionPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [EditpreferredoptionPage]
})
export class EditpreferredoptionPageModule {}
