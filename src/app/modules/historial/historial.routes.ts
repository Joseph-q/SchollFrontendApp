import { Routes } from '@angular/router';

export const HISTORIAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/historial-page/historial-page.component').then(
        (m) => m.HistorialPageComponent
      ),
  },
];
