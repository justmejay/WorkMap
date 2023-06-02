import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyreviewPage } from './companyreview.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyreviewPageRoutingModule {}
