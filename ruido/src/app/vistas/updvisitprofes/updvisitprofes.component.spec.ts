import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdvisitprofesComponent } from './updvisitprofes.component';

describe('UpdvisitprofesComponent', () => {
  let component: UpdvisitprofesComponent;
  let fixture: ComponentFixture<UpdvisitprofesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdvisitprofesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdvisitprofesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
