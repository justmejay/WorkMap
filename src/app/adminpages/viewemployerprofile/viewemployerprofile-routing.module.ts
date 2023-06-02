import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewemployerprofilePage } from './viewemployerprofile.page';

const routes: Routes = [
  {
    path: '',
    component: ViewemployerprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewemployerprofilePageRoutingModule {}
