import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarServicoPageRoutingModule } from './criar-servico-routing.module';
import { MainContentComponent } from '../../components/main-content/main-content.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CriarServicoPage } from './criar-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarServicoPageRoutingModule,
    MainContentComponent,
    ReactiveFormsModule
  ],
  declarations: [CriarServicoPage]
})
export class CriarServicoPageModule {}
