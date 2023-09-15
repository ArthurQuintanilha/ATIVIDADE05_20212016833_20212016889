import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArvoreFotoPage } from './arvore-foto.page';

const routes: Routes = [
  {
    path: '',
    component: ArvoreFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArvoreFotoPageRoutingModule {}
