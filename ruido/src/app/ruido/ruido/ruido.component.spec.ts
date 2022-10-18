import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuidoComponent } from './ruido.component';

describe('RuidoComponent', () => {
  let component: RuidoComponent;
  let fixture: ComponentFixture<RuidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
