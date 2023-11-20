import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidaddataComponent } from './calidaddata.component';

describe('CalidaddataComponent', () => {
  let component: CalidaddataComponent;
  let fixture: ComponentFixture<CalidaddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalidaddataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalidaddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
