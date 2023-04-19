import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomecompanyPage } from './homecompany.page';

const routes: Routes = [
  {
    path: '',
    component: HomecompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomecompanyPageRoutingModule {}
