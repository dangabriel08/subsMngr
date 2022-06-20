import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'subs',
    redirectTo: 'subs',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'subs',
    loadChildren: () => import('./subs/subs.module').then( m => m.SubsPageModule ),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-subs',
    loadChildren: () => import('./add-subs/add-subs.module').then( m => m.AddSubsPageModule),
    canActivate:[AuthGuard]

  },
  {
    path: 'edit-subs/:id',
    loadChildren: () => import('./edit-subs/edit-subs.module').then( m => m.EditSubsPageModule),
    canActivate:[AuthGuard]

  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
