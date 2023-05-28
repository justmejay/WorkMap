import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpostuserPage } from './editpostuser.page';

const routes: Routes = [
  {
    path: '',
    component: EditpostuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpostuserPageRoutingModule {}
