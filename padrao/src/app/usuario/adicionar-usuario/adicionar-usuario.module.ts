import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarUsuarioPageRoutingModule } from './adicionar-usuario-routing.module';

import { AdicionarUsuarioPage } from './adicionar-usuario.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarUsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdicionarUsuarioPage]
})
export class AdicionarUsuarioPageModule {}
