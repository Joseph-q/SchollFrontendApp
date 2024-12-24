import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistancesTableComponent } from './assistances-table.component';

describe('AssistancesTableComponent', () => {
  let component: AssistancesTableComponent;
  let fixture: ComponentFixture<AssistancesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistancesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
