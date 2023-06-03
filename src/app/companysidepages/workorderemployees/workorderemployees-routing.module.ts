import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkorderemployeesPage } from './workorderemployees.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderemployeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkorderemployeesPageRoutingModule {}
