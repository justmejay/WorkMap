import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotconfirmPage } from './forgotconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotconfirmPageRoutingModule {}
