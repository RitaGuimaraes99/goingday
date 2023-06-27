import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedLocaisPage } from './saved-locais.page';

const routes: Routes = [
  {
    path: '',
    component: SavedLocaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedLocaisPageRoutingModule {}
