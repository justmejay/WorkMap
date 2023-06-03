import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddworkorderPage } from './addworkorder.page';

const routes: Routes = [
  {
    path: '',
    component: AddworkorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddworkorderPageRoutingModule {}
