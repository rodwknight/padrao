import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnidadePageRoutingModule } from './unidade-routing.module';

import { UnidadePage } from './unidade.page';
import { MainContentComponent } from '../components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnidadePageRoutingModule,
    MainContentComponent
  ],
  declarations: [UnidadePage]
})
export class UnidadePageModule {}
