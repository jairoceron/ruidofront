import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropvehiculoComponent } from './propvehiculo.component';

describe('PropvehiculoComponent', () => {
  let component: PropvehiculoComponent;
  let fixture: ComponentFixture<PropvehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropvehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropvehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
