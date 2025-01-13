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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropostaPageRoutingModule {}
