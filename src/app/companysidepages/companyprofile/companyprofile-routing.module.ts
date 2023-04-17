import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyprofilePage } from './companyprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyprofilePageRoutingModule {}
