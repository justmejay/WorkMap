import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoresignupccompanyPage } from './moresignupccompany.page';

const routes: Routes = [
  {
    path: '',
    component: MoresignupccompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoresignupccompanyPageRoutingModule {}
