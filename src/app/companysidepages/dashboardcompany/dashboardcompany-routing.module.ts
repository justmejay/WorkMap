import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardcompanyPage } from './dashboardcompany.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardcompanyPageRoutingModule {}
