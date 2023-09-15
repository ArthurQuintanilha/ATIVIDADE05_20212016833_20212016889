import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArvoresPageRoutingModule } from './arvores-routing.module';

import { ArvoresPage } from './arvores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArvoresPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArvoresPage]
})
export class ArvoresPageModule {}
