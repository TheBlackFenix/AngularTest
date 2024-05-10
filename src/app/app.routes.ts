import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    children: [
      {
        path: 'tests',
        loadComponent: () =>
          import('./pages/input-test/input-test.component').then(
            m => m.InputTestComponent
          ),
      },
      {
        path: 'Grafica',
        loadComponent: () =>
          import('./pages/grafica-test/grafica-test.component'),
      },
      {
        path: 'GraficaApex',
        loadComponent: () =>
          import('./pages/grafica-apex/grafica-apex.component'),
      },
      {
        path: 'pdfTest',
        loadComponent: () => import('./pages/pdf-test/pdf-test.component'),
      },
      {
        path: '',
        redirectTo: 'tests',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.component').then(
        m => m.RegisterComponent
      ),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
  },
];
