import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditworkorderPage } from './editworkorder.page';

const routes: Routes = [
  {
    path: '',
    component: EditworkorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditworkorderPageRoutingModule {}
