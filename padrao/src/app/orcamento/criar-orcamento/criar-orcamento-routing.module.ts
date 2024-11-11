import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarOrcamentoPage } from './criar-orcamento.page';

const routes: Routes = [
  {
    path: '',
    component: CriarOrcamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarOrcamentoPageRoutingModule {}
