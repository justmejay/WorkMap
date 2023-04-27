import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditjoblistingPage } from './editjoblisting.page';

const routes: Routes = [
  {
    path: '',
    component: EditjoblistingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditjoblistingPageRoutingModule {}
