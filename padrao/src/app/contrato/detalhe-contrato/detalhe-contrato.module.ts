import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheContratoPageRoutingModule } from './detalhe-contrato-routing.module';

import { DetalheContratoPage } from './detalhe-contrato.page';

import { MainContentComponent } from 'src/app/components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheContratoPageRoutingModule,
    MainContentComponent
  ],
  declarations: [DetalheContratoPage]
})
export class DetalheContratoPageModule {}
