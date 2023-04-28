import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpostcompanyPage } from './addpostcompany.page';

const routes: Routes = [
  {
    path: '',
    component: AddpostcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpostcompanyPageRoutingModule {}
