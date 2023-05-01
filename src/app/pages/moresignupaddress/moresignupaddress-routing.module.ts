import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoresignupaddressPage } from './moresignupaddress.page';

const routes: Routes = [
  {
    path: '',
    component: MoresignupaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoresignupaddressPageRoutingModule {}
