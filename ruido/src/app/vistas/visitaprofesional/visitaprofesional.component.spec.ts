import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaprofesionalComponent } from './visitaprofesional.component';

describe('VisitaprofesionalComponent', () => {
  let component: VisitaprofesionalComponent;
  let fixture: ComponentFixture<VisitaprofesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaprofesionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitaprofesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
