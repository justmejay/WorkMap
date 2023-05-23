import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpostcompanyPage } from './editpostcompany.page';

const routes: Routes = [
  {
    path: '',
    component: EditpostcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpostcompanyPageRoutingModule {}
