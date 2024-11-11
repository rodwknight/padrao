import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrcamentoPage } from './orcamento.page';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoPage
  },  {
    path: 'criar-orcamento',
    loadChildren: () => import('./criar-orcamento/criar-orcamento.module').then( m => m.CriarOrcamentoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentoPageRoutingModule {}
