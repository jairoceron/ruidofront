import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartgenericoComponent } from './chartgenerico.component';

describe('ChartgenericoComponent', () => {
  let component: ChartgenericoComponent;
  let fixture: ComponentFixture<ChartgenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartgenericoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartgenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
