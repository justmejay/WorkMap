import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeworkorderPage } from './employeeworkorder.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeworkorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeworkorderPageRoutingModule {}
