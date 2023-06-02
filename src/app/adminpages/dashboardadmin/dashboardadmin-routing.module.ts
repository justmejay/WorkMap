import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardadminPage } from './dashboardadmin.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardadminPageRoutingModule {}
