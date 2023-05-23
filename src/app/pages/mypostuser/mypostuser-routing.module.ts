import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypostuserPage } from './mypostuser.page';

const routes: Routes = [
  {
    path: '',
    component: MypostuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypostuserPageRoutingModule {}
