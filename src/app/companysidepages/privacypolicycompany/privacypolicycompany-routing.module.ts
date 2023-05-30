import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacypolicycompanyPage } from './privacypolicycompany.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacypolicycompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacypolicycompanyPageRoutingModule {}
