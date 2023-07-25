import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArvoresPage } from './arvores.page';

const routes: Routes = [
  {
    path: '',
    component: ArvoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArvoresPageRoutingModule {}
