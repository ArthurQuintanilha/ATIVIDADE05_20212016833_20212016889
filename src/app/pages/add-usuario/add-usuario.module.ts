import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUsuarioPageRoutingModule } from './add-usuario-routing.module';

import { AddUsuarioPage } from './add-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddUsuarioPageRoutingModule
  ],
  declarations: [AddUsuarioPage]
})
export class AddUsuarioPageModule {}
