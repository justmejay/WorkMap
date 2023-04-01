import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditaboutmePage } from './editaboutme.page';

const routes: Routes = [
  {
    path: '',
    component: EditaboutmePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditaboutmePageRoutingModule {}
