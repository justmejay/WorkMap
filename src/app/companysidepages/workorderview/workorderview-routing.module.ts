import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkorderviewPage } from './workorderview.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkorderviewPageRoutingModule {}
