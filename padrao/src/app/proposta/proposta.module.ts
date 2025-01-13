import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropostaPageRoutingModule } from './proposta-routing.module';

import { PropostaPage } from './proposta.page';
import { MainContentComponent } from '../components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropostaPageRoutingModule,
    MainContentComponent
  ],
  declarations: [PropostaPage]
})
export class PropostaPageModule {}
