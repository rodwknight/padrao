import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarUnidadePageRoutingModule } from './adicionar-unidade-routing.module';

import { AdicionarUnidadePage } from './adicionar-unidade.page';
import { MainContentComponent } from 'src/app/components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarUnidadePageRoutingModule,
    ReactiveFormsModule,
    MainContentComponent
  ],
  declarations: [AdicionarUnidadePage]
})
export class AdicionarUnidadePageModule {}
