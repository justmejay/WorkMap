import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddexperiencePage } from './addexperience.page';

const routes: Routes = [
  {
    path: '',
    component: AddexperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddexperiencePageRoutingModule {}
