import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'proposta',
    loadChildren: () => import('./proposta/proposta.module').then( m => m.PropostaPageModule)
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./configuracao/configuracao.module').then( m => m.ConfiguracaoPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'unidade',
    loadChildren: () => import('./unidade/unidade.module').then( m => m.UnidadePageModule)
  },
  {
    path: 'servico',
    loadChildren: () => import('./servico/servico.module').then( m => m.ServicoPageModule)
  },
  {
    path: 'contrato',
    loadChildren: () => import('./contrato/contrato.module').then( m => m.ContratoPageModule)
  },
  {
    path: 'ordem',
    loadChildren: () => import('./ordem/ordem.module').then( m => m.OrdemPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
