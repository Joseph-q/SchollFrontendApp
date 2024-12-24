import { Routes } from '@angular/router';
import { StudentPageComponent } from './pages/student-page/student-page.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentPageComponent,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/student-detail-page/student-detail.component').then(
        (m) => m.StudentDetailComponent
      ),
    children: [
      {
        path: 'qr-code',
        loadComponent: () =>
          import(
            './sections/student-detail/qr-section/qr-section.component'
          ).then((m) => m.QrSectionComponent),
      },
      {
        path: 'assistances',
        loadComponent: () =>
          import(
            './sections/student-detail/assitances-table/assitances-table.component'
          ).then((m) => m.AssitancesTableComponent),
      },
    ],
  },
];
