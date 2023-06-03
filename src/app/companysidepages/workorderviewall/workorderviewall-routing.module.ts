import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkorderviewallPage } from './workorderviewall.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderviewallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkorderviewallPageRoutingModule {}
