import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewemployeePage } from './viewemployee.page';

const routes: Routes = [
  {
    path: '',
    component: ViewemployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewemployeePageRoutingModule {}
