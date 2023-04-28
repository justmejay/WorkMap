import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HometabcompanyPage } from './hometabcompany.page';

const routes: Routes = [
  {
    path: '',
    component: HometabcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HometabcompanyPageRoutingModule {}
