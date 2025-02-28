import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheOrdemPageRoutingModule } from './detalhe-ordem-routing.module';

import { DetalheOrdemPage } from './detalhe-ordem.page';
import { MainContentComponent } from 'src/app/components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheOrdemPageRoutingModule,
    MainContentComponent
  ],
  declarations: [DetalheOrdemPage]
})
export class DetalheOrdemPageModule {}
