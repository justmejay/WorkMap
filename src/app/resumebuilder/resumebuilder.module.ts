import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumebuilderPageRoutingModule } from './resumebuilder-routing.module';

import { ResumebuilderPage } from './resumebuilder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumebuilderPageRoutingModule
  ],
  declarations: [ResumebuilderPage]
})
export class ResumebuilderPageModule {}
