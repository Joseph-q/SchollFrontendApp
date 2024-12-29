import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentsService } from '../../../core/services/student/students.service';
import { SearchStudentResponse } from '../../../core/services/student/interfaces/response/SearchStudent.interface';

import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchSvg } from '../svg/search.svg';
import { QuerySearchStudent } from '@core/services/student/interfaces/request/SearchStudentQuery.interface';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    //Material
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    //Angular
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SearchSvg,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
  private studentService = inject(StudentsService);
  private valueIsNumber = (value: string): boolean => /^\d+$/.test(value);
  private valueIsEmail = (value: string): boolean =>
    /^[\w.%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(value);

  protected searchInput = new FormControl();
  protected filteredOptions: SearchStudentResponse | null = null;
  protected iconOptions = IconOptions;

  private SearchParms: QuerySearchStudent = {
    limit: 5,
    searchValues: {},
  };
  unsubscribe$: Subject<void> = new Subject<void>();

  currentIcon = signal<IconOptions>(IconOptions.Search);

  onChangeIcon(iconName: IconOptions) {
    this.currentIcon.set(iconName);
  }

  ngAfterViewInit(): void {
    this.searchInput.valueChanges
      .pipe(
        startWith(''),
        takeUntil(this.unsubscribe$),
        debounceTime(500), // Espera 300 ms después de que el usuario deje de escribir.
        distinctUntilChanged(), // Solo emite un valor si es diferente del anterior.
        map((value: string) => this.updateSearchParams(value)),
        switchMap((v: string) => {
          if (v.length <= 1) {
            this.currentIcon.set(IconOptions.Search);
          }
          if (this.valueIsEmail(v)) {
            this.currentIcon.set(this.iconOptions.Email);
            this.SearchParms = {
              ...this.SearchParms,
              searchValues: { email: v },
            };
          }
          if (this.valueIsNumber(v)) {
            this.currentIcon.set(this.iconOptions.Phone);
            this.SearchParms = {
              ...this.SearchParms,
              searchValues: { number: v },
            };
          }
          if (v.length <= 2) return [];

          return this.studentService.searchStudent(v, this.SearchParms);
        })
      )
      .subscribe({
        next: (filteredResults) => {
          this.filteredOptions = filteredResults; // Asigna los resultados filtrados a la variable observable
        },
      });
  }
  private updateSearchParams(value: string): string {
    const searchFieldMap: Record<IconOptions, string> = {
      [IconOptions.Person]: 'name',
      [IconOptions.Email]: 'email',
      [IconOptions.Phone]: 'number',
      [IconOptions.Search]: '',
    };

    const field = searchFieldMap[this.currentIcon()] || 'name';
    this.SearchParms = {
      ...this.SearchParms,
      searchValues: {
        [field]: value,
      },
    };

    return value;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete;
  }
}

enum IconOptions {
  Search = 'search',
  Person = 'person',
  Email = 'email',
  Phone = 'phone',
}
