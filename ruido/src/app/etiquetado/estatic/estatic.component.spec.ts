import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstaticComponent } from './estatic.component';

describe('EstaticComponent', () => {
  let component: EstaticComponent;
  let fixture: ComponentFixture<EstaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstaticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
