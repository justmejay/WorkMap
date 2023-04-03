import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditemployerprofilePage } from './editemployerprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditemployerprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditemployerprofilePageRoutingModule {}
