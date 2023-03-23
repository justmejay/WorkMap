import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditexperiencePage } from './editexperience.page';

const routes: Routes = [
  {
    path: '',
    component: EditexperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditexperiencePageRoutingModule {}
