import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsdireccComponent } from './consdirecc.component';

describe('ConsdireccComponent', () => {
  let component: ConsdireccComponent;
  let fixture: ComponentFixture<ConsdireccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsdireccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsdireccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
