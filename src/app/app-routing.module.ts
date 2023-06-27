import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
  },
  {
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
  path: 'folder/:id',
  loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
  path: 'register',
  loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
  path: 'viagem',
  loadChildren: () => import('./pages/viagem/viagem.module').then( m => m.ViagemPageModule)
  },
  {
  path: 'saved-locais',
  loadChildren: () => import('./pages/saved-locais/saved-locais.module').then( m => m.SavedLocaisPageModule)
  },
  {
  path: 'viagens-criadas',
  loadChildren: () => import('./pages/viagens-criadas/viagens-criadas.module').then( m => m.ViagensCriadasPageModule)
  },
  {
  path: 'perfil',
  loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
