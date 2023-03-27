import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumebuilderPage } from './resumebuilder.page';

const routes: Routes = [
  {
    path: '',
    component: ResumebuilderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumebuilderPageRoutingModule {}
