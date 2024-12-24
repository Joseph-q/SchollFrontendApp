import { Routes } from '@angular/router';

export const COURSE_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-detail/course-detail.component').then(
        (m) => m.CourseDetailComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'historial',
        pathMatch: 'full',
      },
      {
        path: 'assistances',
        loadComponent: () =>
          import(
            './sections/course-detail/assistances-table/assistances-table.component'
          ).then((m) => m.AssistancesTableComponent),
      },
      {
        path: 'historial',
        loadComponent: () =>
          import(
            './sections/course-detail/historial-table/historial-table.component'
          ).then((m) => m.HistorialTableComponent),
      },
    ],
  },
];
