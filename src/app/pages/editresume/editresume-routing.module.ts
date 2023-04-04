import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditresumePage } from './editresume.page';

const routes: Routes = [
  {
    path: '',
    component: EditresumePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditresumePageRoutingModule {}
