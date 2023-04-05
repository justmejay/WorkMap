import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewnotificationPage } from './viewnotification.page';

const routes: Routes = [
  {
    path: '',
    component: ViewnotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewnotificationPageRoutingModule {}
