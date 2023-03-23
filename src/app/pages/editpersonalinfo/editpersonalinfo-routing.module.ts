import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpersonalinfoPage } from './editpersonalinfo.page';

const routes: Routes = [
  {
    path: '',
    component: EditpersonalinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpersonalinfoPageRoutingModule {}
