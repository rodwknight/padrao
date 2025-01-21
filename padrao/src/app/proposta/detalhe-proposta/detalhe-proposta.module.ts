import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhePropostaPageRoutingModule } from './detalhe-proposta-routing.module';

import { DetalhePropostaPage } from './detalhe-proposta.page';
import { MainContentComponent } from 'src/app/components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhePropostaPageRoutingModule,
    MainContentComponent
  ],
  declarations: [DetalhePropostaPage]
})
export class DetalhePropostaPageModule {}
