import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagescompanyPage } from './messagescompany.page';

const routes: Routes = [
  {
    path: '',
    component: MessagescompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagescompanyPageRoutingModule {}
