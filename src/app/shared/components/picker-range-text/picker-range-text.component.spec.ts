import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerRangeTextComponent } from './picker-range-text.component';

describe('PickerRangeTextComponent', () => {
  let component: PickerRangeTextComponent;
  let fixture: ComponentFixture<PickerRangeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickerRangeTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickerRangeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
