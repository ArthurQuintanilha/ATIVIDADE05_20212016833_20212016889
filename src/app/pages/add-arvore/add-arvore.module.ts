import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArvorePageRoutingModule } from './add-arvore-routing.module';

import { AddArvorePage } from './add-arvore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddArvorePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddArvorePage]
})
export class AddArvorePageModule {}
