import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkorderlistPage } from './workorderlist.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkorderlistPageRoutingModule {}
