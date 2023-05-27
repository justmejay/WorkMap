import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutuscPage } from './aboutusc.page';

const routes: Routes = [
  {
    path: '',
    component: AboutuscPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutuscPageRoutingModule {}
