import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentsService } from '../../../core/services/student/students.service';
import { SearchStudentResponse } from '../../../core/services/student/interfaces/response/SearchStudent.interface';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SearchValuesStudents } from '@core/services/student/interfaces/request/SearchStudentQuery.interface';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    //Material
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    //Angular
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements AfterViewInit {
  searchInput = new FormControl();
  filteredOptions: SearchStudentResponse | null = null;
  studentService = inject(StudentsService);

  limitQuerySearch = 5;

  ngAfterViewInit(): void {
    this.searchInput.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300), // Espera 300 ms después de que el usuario deje de escribir.
        distinctUntilChanged(), // Solo emite un valor si es diferente del anterior.
        switchMap((value: string) => {
          var searchValues: SearchValuesStudents;
          if (this.valueIsNumber(value)) {
            searchValues = {
              number: value,
            };
          } else if (this.valueIsEmail(value)) {
            searchValues = {
              email: value,
            };
          } else {
            searchValues = {
              name: value,
            };
          }

          return this.studentService.searchStudent(value, {
            limit: this.limitQuerySearch,
            searchValues,
          });
        })
      )
      .subscribe({
        next: (filteredResults) => {
          this.filteredOptions = filteredResults; // Asigna los resultados filtrados a la variable observable
        },
      });
  }
  onClickInput() {}

  valueIsNumber = (value: string): boolean => /^\d+$/.test(value);
  valueIsEmail = (value: string): boolean => value.includes('@');
}
