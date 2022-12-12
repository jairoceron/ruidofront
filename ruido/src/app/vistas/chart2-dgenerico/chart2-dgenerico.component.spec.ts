import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart2DgenericoComponent } from './chart2-dgenerico.component';

describe('Chart2DgenericoComponent', () => {
  let component: Chart2DgenericoComponent;
  let fixture: ComponentFixture<Chart2DgenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chart2DgenericoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chart2DgenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
