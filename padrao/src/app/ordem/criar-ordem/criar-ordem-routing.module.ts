import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarOrdemPage } from './criar-ordem.page';

const routes: Routes = [
  {
    path: '',
    component: CriarOrdemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarOrdemPageRoutingModule {}
