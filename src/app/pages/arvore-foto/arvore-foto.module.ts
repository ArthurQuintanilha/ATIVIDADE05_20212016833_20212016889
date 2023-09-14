import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArvoreFotoPageRoutingModule } from './arvore-foto-routing.module';

import { ArvoreFotoPage } from './arvore-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArvoreFotoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArvoreFotoPage]
})
export class ArvoreFotoPageModule {}
