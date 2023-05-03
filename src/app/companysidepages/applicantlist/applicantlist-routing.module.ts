import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantlistPage } from './applicantlist.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantlistPageRoutingModule {}
