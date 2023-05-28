import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditjoblistPage } from './editjoblist.page';

const routes: Routes = [
  {
    path: '',
    component: EditjoblistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditjoblistPageRoutingModule {}
