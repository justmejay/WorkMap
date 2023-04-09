import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateemployeePage } from './rateemployee.page';

const routes: Routes = [
  {
    path: '',
    component: RateemployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateemployeePageRoutingModule {}
