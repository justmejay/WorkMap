import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantprofilePage } from './applicantprofile.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantprofilePageRoutingModule {}
