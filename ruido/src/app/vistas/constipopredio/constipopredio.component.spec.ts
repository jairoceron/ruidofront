import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstipopredioComponent } from './constipopredio.component';

describe('ConstipopredioComponent', () => {
  let component: ConstipopredioComponent;
  let fixture: ComponentFixture<ConstipopredioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstipopredioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstipopredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
