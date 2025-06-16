import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioPageRoutingModule } from './usuario-routing.module';

import { UsuarioPage } from './usuario.page';

import { MainContentComponent } from '../components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioPageRoutingModule,
    MainContentComponent
  ],
  declarations: [UsuarioPage]
})
export class UsuarioPageModule {}
