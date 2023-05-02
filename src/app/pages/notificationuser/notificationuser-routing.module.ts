import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationuserPage } from './notificationuser.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationuserPageRoutingModule {}
