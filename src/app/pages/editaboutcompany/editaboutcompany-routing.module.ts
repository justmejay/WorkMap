import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditaboutcompanyPage } from './editaboutcompany.page';

const routes: Routes = [
  {
    path: '',
    component: EditaboutcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditaboutcompanyPageRoutingModule {}
