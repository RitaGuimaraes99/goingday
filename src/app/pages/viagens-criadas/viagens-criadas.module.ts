import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViagensCriadasPageRoutingModule } from './viagens-criadas-routing.module';

import { ViagensCriadasPage } from './viagens-criadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViagensCriadasPageRoutingModule
  ],
  declarations: [ViagensCriadasPage]
})
export class ViagensCriadasPageModule {}
