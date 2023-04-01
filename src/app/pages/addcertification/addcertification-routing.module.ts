import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcertificationPage } from './addcertification.page';

const routes: Routes = [
  {
    path: '',
    component: AddcertificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcertificationPageRoutingModule {}
