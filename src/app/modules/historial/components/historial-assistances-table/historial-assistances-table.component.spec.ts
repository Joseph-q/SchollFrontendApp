import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAssistancesTableComponent } from './historial-assistances-table.component';

describe('HistorialAssistancesTableComponent', () => {
  let component: HistorialAssistancesTableComponent;
  let fixture: ComponentFixture<HistorialAssistancesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialAssistancesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialAssistancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
