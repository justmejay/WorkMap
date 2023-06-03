import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditworkordersinglePage } from './editworkordersingle.page';

const routes: Routes = [
  {
    path: '',
    component: EditworkordersinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditworkordersinglePageRoutingModule {}
