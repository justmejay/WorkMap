import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditschoolPage } from './editschool.page';

const routes: Routes = [
  {
    path: '',
    component: EditschoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditschoolPageRoutingModule {}
