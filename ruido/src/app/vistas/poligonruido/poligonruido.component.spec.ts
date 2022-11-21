import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoligonruidoComponent } from './poligonruido.component';

describe('PoligonruidoComponent', () => {
  let component: PoligonruidoComponent;
  let fixture: ComponentFixture<PoligonruidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoligonruidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoligonruidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
