import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpreferredoptionPage } from './editpreferredoption.page';

const routes: Routes = [
  {
    path: '',
    component: EditpreferredoptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpreferredoptionPageRoutingModule {}
