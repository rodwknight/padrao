import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarServicoPage } from './criar-servico.page';

const routes: Routes = [
  {
    path: '',
    component: CriarServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarServicoPageRoutingModule {}
