import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutcompanyPage } from './aboutcompany.page';

const routes: Routes = [
  {
    path: '',
    component: AboutcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutcompanyPageRoutingModule {}
