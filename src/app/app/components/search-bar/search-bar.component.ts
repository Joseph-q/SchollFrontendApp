import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentsService } from '../../../core/services/student/students.service';
import { SearchStudentResponse } from '../../../core/services/student/interfaces/response/SearchStudent.interface';

import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SearchSvg } from '../svg/search.svg';
import { QuerySearchStudent } from '@core/services/student/interfaces/request/SearchStudentQuery.interface';
import { Observable, Subject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    //Material
    MatIconModule,
    MatAutocompleteModule,
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

  @ViewChild('searchInputElement') searchInputElement!: ElementRef<HTMLInputElement>;

  private SearchParms: QuerySearchStudent = {
    limit: 5,
    searchValues: {},
  };
  unsubscribe$: Subject<void> = new Subject<void>();

  currentIcon = signal<IconOptions>(IconOptions.Search);

  onChangeIcon(iconName: IconOptions) {
    this.currentIcon.set(iconName);
    if(iconName == IconOptions.Email){
      this.SearchParms= {...this.SearchParms,searchValues:{email:this.searchInput.value}}
    }else if(iconName == IconOptions.Phone){
      this.SearchParms= {...this.SearchParms,searchValues:{number:this.searchInput.value}}
    }else{
      this.SearchParms= {...this.SearchParms,searchValues:{name:this.searchInput.value}}
    }

    this.forceReload().subscribe((v) => {
      this.filteredOptions = v;
      this.searchInputElement.nativeElement.focus();
    });
  }

  ngAfterViewInit(): void {
    this.searchInput.valueChanges
      .pipe(
        startWith(''),
        takeUntil(this.unsubscribe$),
        filter((v: string) => v.length >= 2),
        map((v) => this.updateSearchParams(v)),
        debounceTime(450),
        distinctUntilChanged(), // Solo emite un valor si es diferente del anterior.
        switchMap((v: string) => {
          return this.studentService.searchStudent(v, this.SearchParms);
        })
      )
      .subscribe({
        next: (filteredResults) => {
          this.filteredOptions = filteredResults; // Asigna los resultados filtrados a la variable observable
        },
      });
  }

  private forceReload(): Observable<SearchStudentResponse> {
    return this.studentService.searchStudent(
      this.searchInput.value,
      this.SearchParms
    );
  }

  private updateSearchParams(value: string): string {
    if (this.valueIsEmail(value)) {
      this.currentIcon.set(this.iconOptions.Email);
    } else if (this.valueIsNumber(value)) {
      this.currentIcon.set(this.iconOptions.Phone);
    } else {
      this.currentIcon.set(this.iconOptions.Search);
    }

    const searchFieldMap: Record<IconOptions, string> = {
      [IconOptions.Email]: 'email',
      [IconOptions.Phone]: 'number',
      [IconOptions.Search]: 'name',
      [IconOptions.Person]: 'name'
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
  Email = 'email',
  Phone = 'phone',
  Person = 'person'
}
