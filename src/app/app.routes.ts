import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./myapp/myapp.module').then(
        mod => mod.MyAppModule
      )
  },
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then(
        mod => mod.PublicModule
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
