import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropostaPage } from './proposta.page';

const routes: Routes = [
  {
    path: '',
    component: PropostaPage
  },
  {
    path: 'criar-proposta',
    loadChildren: () => import('./criar-proposta/criar-proposta.module').then( m => m.CriarPropostaPageModule)
  },  {
    path: 'detalhe-proposta',
    loadChildren: () => import('./detalhe-proposta/detalhe-proposta.module').then( m => m.DetalhePropostaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropostaPageRoutingModule {}
