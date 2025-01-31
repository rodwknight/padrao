import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratoPage } from './contrato.page';

const routes: Routes = [
  {
    path: '',
    component: ContratoPage
  },  {
    path: 'detalhe-contrato',
    loadChildren: () => import('./detalhe-contrato/detalhe-contrato.module').then( m => m.DetalheContratoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratoPageRoutingModule {}
