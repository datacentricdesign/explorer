import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublicComponent } from './public.component';

export const PublicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      }
    ]
  }
];

export let PublicRouterModule = RouterModule.forChild(
    PublicRoutes
);
