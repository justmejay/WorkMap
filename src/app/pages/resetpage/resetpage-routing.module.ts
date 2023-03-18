import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetpagePage } from './resetpage.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetpagePageRoutingModule {}
