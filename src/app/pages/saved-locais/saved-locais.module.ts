import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedLocaisPageRoutingModule } from './saved-locais-routing.module';

import { SavedLocaisPage } from './saved-locais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedLocaisPageRoutingModule
  ],
  declarations: [SavedLocaisPage]
})
export class SavedLocaisPageModule {}
