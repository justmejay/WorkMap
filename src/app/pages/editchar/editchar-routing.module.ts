import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcharPage } from './editchar.page';

const routes: Routes = [
  {
    path: '',
    component: EditcharPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcharPageRoutingModule {}
