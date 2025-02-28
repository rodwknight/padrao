import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdemPage } from './ordem.page';

const routes: Routes = [
  {
    path: '',
    component: OrdemPage
  },  {
    path: 'detalhe-ordem',
    loadChildren: () => import('./detalhe-ordem/detalhe-ordem.module').then( m => m.DetalheOrdemPageModule)
  },
  {
    path: 'criar-ordem',
    loadChildren: () => import('./criar-ordem/criar-ordem.module').then( m => m.CriarOrdemPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdemPageRoutingModule {}
