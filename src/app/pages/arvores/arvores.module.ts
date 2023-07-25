import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArvoresPageRoutingModule } from './arvores-routing.module';

import { ArvoresPage } from './arvores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArvoresPageRoutingModule
  ],
  declarations: [ArvoresPage]
})
export class ArvoresPageModule {}
