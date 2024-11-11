import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarOrcamentoPageRoutingModule } from './criar-orcamento-routing.module';

import { CriarOrcamentoPage } from './criar-orcamento.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MainContentComponent } from 'src/app/components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarOrcamentoPageRoutingModule,
    ReactiveFormsModule,
    MainContentComponent
  ],
  declarations: [CriarOrcamentoPage]
})
export class CriarOrcamentoPageModule {}
