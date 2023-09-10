import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
    {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'arvores',
    loadChildren: () => import('./pages/arvores/arvores.module').then( m => m.ArvoresPageModule)
  },
  {
    path: 'meus-dados',
    loadChildren: () => import('./pages/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule)
  },
  {
    path: 'add-arvore',
    loadChildren: () => import('./pages/add-arvore/add-arvore.module').then( m => m.AddArvorePageModule)
  },
  {
    path: 'add-arvore/:id',
    loadChildren: () => import('./pages/add-arvore/add-arvore.module').then( m => m.AddArvorePageModule)
  },
  {
    path: 'ocorrencias/:idArvore',
    loadChildren: () => import('./pages/ocorrencias/ocorrencias.module').then( m => m.OcorrenciasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'add-usuario',
    loadChildren: () => import('./pages/add-usuario/add-usuario.module').then( m => m.AddUsuarioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
