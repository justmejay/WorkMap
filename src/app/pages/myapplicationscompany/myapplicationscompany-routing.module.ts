import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyapplicationscompanyPage } from './myapplicationscompany.page';

const routes: Routes = [
  {
    path: '',
    component: MyapplicationscompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyapplicationscompanyPageRoutingModule {}
