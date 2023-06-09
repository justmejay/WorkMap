import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyapplicationsjobPage } from './myapplicationsjob.page';

const routes: Routes = [
  {
    path: '',
    component: MyapplicationsjobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyapplicationsjobPageRoutingModule {}
