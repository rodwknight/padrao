import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarPropostaPageRoutingModule } from './criar-proposta-routing.module';

import { CriarPropostaPage } from './criar-proposta.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MainContentComponent } from 'src/app/components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarPropostaPageRoutingModule,
    ReactiveFormsModule,
    MainContentComponent
  ],
  declarations: [CriarPropostaPage]
})
export class CriarPropostaPageModule {}
