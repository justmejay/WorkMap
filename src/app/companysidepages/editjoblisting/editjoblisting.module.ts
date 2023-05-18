import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditjoblistingPageRoutingModule } from './editjoblisting-routing.module';

import { EditjoblistingPage } from './editjoblisting.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditjoblistingPageRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
  ],
  declarations: [EditjoblistingPage]
})
export class EditjoblistingPageModule {}
