import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssitancesTableComponent } from './assitances-table.component';

describe('AssitancesTableComponent', () => {
  let component: AssitancesTableComponent;
  let fixture: ComponentFixture<AssitancesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssitancesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssitancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
