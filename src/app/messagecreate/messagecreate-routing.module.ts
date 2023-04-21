import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagecreatePage } from './messagecreate.page';

const routes: Routes = [
  {
    path: '',
    component: MessagecreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagecreatePageRoutingModule {}
