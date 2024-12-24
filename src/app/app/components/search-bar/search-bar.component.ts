import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class SearchBarComponent implements OnInit {
  inputControl = new FormControl('');
  filteredOptions$: Observable<SearchStudentResponse | null>;
  public openDialog: boolean = false;

  constructor(private studentService: StudentsService, private router: Router) {
    this.filteredOptions$ = new Observable<SearchStudentResponse>();
  }

  ngOnInit(): void {
    this.inputControl.valueChanges.pipe(startWith('')).subscribe({
      next: (value) => {
        if (value != null && value != '') {
          this.filteredOptions$ = this.studentService.searchStudent(value);
        }
      },
    });
  }
  onClickInput() {
    this.openDialog = true;
  }
  toStudent(id: number) {
    this.router.navigate(['students', id, 'assistances']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.search-results-container') &&
      !target.closest('input[type="text"]')
    ) {
      this.openDialog = false;
    }
  }
}
