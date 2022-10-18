import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicadoComponent } from './radicado.component';

describe('RadicadoComponent', () => {
  let component: RadicadoComponent;
  let fixture: ComponentFixture<RadicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadicadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
