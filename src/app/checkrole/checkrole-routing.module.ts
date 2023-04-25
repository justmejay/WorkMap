import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckrolePage } from './checkrole.page';

const routes: Routes = [
  {
    path: '',
    component: CheckrolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckrolePageRoutingModule {}
