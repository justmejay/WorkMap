import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyregisterPage } from './companyregister.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyregisterPageRoutingModule {}
