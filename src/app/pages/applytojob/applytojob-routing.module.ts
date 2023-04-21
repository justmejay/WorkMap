import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplytojobPage } from './applytojob.page';

const routes: Routes = [
  {
    path: '',
    component: ApplytojobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplytojobPageRoutingModule {}
