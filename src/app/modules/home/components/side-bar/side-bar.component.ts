import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { map, Observable } from "rxjs";

import { CourseService } from "@core/services/courses/courses.service";
import { CourseFromCoursesResponse } from "@core/services/courses/interfaces/response/courses.response.interface";


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    AsyncPipe,
    MatIconModule,
    MatDividerModule,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  public courses$: Observable<CourseFromCoursesResponse[]>;
  @Output() showModal = new EventEmitter<void>();

  constructor(courseService: CourseService, private router: Router) {
    this.courses$ = courseService.getCourses(1, 50).pipe(
      map((data) => {
        return data.courses.sort((a, b) => b.name.length - a.name.length);
      })
    );
  }

  isActiveRoute(courseId: number) {
    return this.router.url.includes(`/courses/${courseId}`);
  }

  onClickRoute(courseId: number): any[] {
    const route = this.router.url.split('/')[3];
    if (!route) {
      return ['courses', courseId];
    }
    return ['courses', courseId, route ? route.split('?')[0] : ''];
  }
}
