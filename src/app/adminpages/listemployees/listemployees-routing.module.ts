import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListemployeesPage } from './listemployees.page';

const routes: Routes = [
  {
    path: '',
    component: ListemployeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListemployeesPageRoutingModule {}
