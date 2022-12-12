import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConslocalidadComponent } from './conslocalidad.component';

describe('ConslocalidadComponent', () => {
  let component: ConslocalidadComponent;
  let fixture: ComponentFixture<ConslocalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConslocalidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConslocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
