import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartestadotramiteComponent } from './chartestadotramite.component';

describe('ChartestadotramiteComponent', () => {
  let component: ChartestadotramiteComponent;
  let fixture: ComponentFixture<ChartestadotramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartestadotramiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartestadotramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
