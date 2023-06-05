import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateemployeeeditPage } from './rateemployeeedit.page';

const routes: Routes = [
  {
    path: '',
    component: RateemployeeeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateemployeeeditPageRoutingModule {}
