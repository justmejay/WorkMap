import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageviewcompanyPage } from './messageviewcompany.page';

const routes: Routes = [
  {
    path: '',
    component: MessageviewcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageviewcompanyPageRoutingModule {}
