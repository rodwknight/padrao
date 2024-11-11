import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarClientePageRoutingModule } from './adicionar-cliente-routing.module';

import { AdicionarClientePage } from './adicionar-cliente.page';
import { MainContentComponent } from '../../components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarClientePageRoutingModule,
    ReactiveFormsModule, 
    MainContentComponent
  ],
  declarations: [AdicionarClientePage]
})
export class AdicionarClientePageModule {}
