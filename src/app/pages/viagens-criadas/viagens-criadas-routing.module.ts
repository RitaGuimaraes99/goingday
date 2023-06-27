import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViagensCriadasPage } from './viagens-criadas.page';

const routes: Routes = [
  {
    path: '',
    component: ViagensCriadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViagensCriadasPageRoutingModule {}
