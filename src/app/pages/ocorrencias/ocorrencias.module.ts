import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OcorrenciasPageRoutingModule } from './ocorrencias-routing.module';

import { OcorrenciasPage } from './ocorrencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcorrenciasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OcorrenciasPage]
})
export class OcorrenciasPageModule {}
