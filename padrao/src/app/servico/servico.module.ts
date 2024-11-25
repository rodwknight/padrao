import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicoPageRoutingModule } from './servico-routing.module';

import { ServicoPage } from './servico.page';
import { MainContentComponent } from '../components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicoPageRoutingModule,
    MainContentComponent
  ],
  declarations: [ServicoPage]
})
export class ServicoPageModule {}
