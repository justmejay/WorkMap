import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcertificationsPage } from './editcertifications.page';

const routes: Routes = [
  {
    path: '',
    component: EditcertificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcertificationsPageRoutingModule {}
