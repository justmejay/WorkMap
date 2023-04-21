import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchenginePage } from './searchengine.page';

const routes: Routes = [
  {
    path: '',
    component: SearchenginePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchenginePageRoutingModule {}
