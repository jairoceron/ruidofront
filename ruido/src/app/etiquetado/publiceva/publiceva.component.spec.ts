import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicevaComponent } from './publiceva.component';

describe('PublicevaComponent', () => {
  let component: PublicevaComponent;
  let fixture: ComponentFixture<PublicevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
