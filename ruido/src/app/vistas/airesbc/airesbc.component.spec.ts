import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiresbcComponent } from './airesbc.component';

describe('AiresbcComponent', () => {
  let component: AiresbcComponent;
  let fixture: ComponentFixture<AiresbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiresbcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiresbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
