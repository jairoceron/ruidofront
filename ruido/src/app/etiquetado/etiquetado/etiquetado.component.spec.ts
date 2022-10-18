import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetadoComponent } from './etiquetado.component';

describe('EtiquetadoComponent', () => {
  let component: EtiquetadoComponent;
  let fixture: ComponentFixture<EtiquetadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtiquetadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
