import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartlocalidadComponent } from './chartlocalidad.component';

describe('ChartlocalidadComponent', () => {
  let component: ChartlocalidadComponent;
  let fixture: ComponentFixture<ChartlocalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartlocalidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartlocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
