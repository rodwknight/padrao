import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrcamentoPageRoutingModule } from './orcamento-routing.module';

import { OrcamentoPage } from './orcamento.page';
import { MainContentComponent } from '../components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrcamentoPageRoutingModule,
    MainContentComponent
  ],
  declarations: [OrcamentoPage]
})
export class OrcamentoPageModule {}
