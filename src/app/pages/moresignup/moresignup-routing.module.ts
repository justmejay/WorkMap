import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoresignupPage } from './moresignup.page';

const routes: Routes = [
  {
    path: '',
    component: MoresignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoresignupPageRoutingModule {}
