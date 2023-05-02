import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagecreatecompanyPage } from './messagecreatecompany.page';

const routes: Routes = [
  {
    path: '',
    component: MessagecreatecompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagecreatecompanyPageRoutingModule {}
