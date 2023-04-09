import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddjoblistingPage } from './addjoblisting.page';

const routes: Routes = [
  {
    path: '',
    component: AddjoblistingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddjoblistingPageRoutingModule {}
