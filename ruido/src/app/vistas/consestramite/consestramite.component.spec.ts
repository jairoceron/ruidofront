import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsestramiteComponent } from './consestramite.component';

describe('ConsestramiteComponent', () => {
  let component: ConsestramiteComponent;
  let fixture: ComponentFixture<ConsestramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsestramiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsestramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
