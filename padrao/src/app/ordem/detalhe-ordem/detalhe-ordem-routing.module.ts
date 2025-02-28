import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheOrdemPage } from './detalhe-ordem.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheOrdemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheOrdemPageRoutingModule {}
