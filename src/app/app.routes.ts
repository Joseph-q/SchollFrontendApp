import { Routes } from '@angular/router';
import { HomePageComponent } from '@home/page/home-page/home-page.component';


export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'students',
        loadChildren: () =>
          import('@students/student.routes').then(
            (m) => m.STUDENT_ROUTES
          ),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('@courses/course.routes').then((m) => m.COURSE_ROUTES),
      },
      {
        path: 'historial',
        loadChildren: () =>
          import('@historial/historial.routes').then(
            (m) => m.HISTORIAL_ROUTES
          ),
      },
      {
        path: 'balancing',
        loadChildren: () =>
          import('@balancing/balancing.routes').then(
            (m) => m.BALANCING_ROUTES
          ),
      },

      {
        path: '',
        loadChildren: () =>
          import('@students/student.routes').then(
            (m) => m.STUDENT_ROUTES
          ),
      },
    ],
  },
];
