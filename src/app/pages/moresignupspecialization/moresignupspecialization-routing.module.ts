import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoresignupspecializationPage } from './moresignupspecialization.page';

const routes: Routes = [
  {
    path: '',
    component: MoresignupspecializationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoresignupspecializationPageRoutingModule {}
