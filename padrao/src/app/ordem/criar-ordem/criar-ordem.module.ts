import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarOrdemPageRoutingModule } from './criar-ordem-routing.module';

import { CriarOrdemPage } from './criar-ordem.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MainContentComponent } from 'src/app/components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarOrdemPageRoutingModule,
    ReactiveFormsModule,
    MainContentComponent
  ],
  declarations: [CriarOrdemPage]
})
export class CriarOrdemPageModule {}
