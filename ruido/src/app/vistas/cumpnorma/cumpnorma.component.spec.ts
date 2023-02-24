import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumpnormaComponent } from './cumpnorma.component';

describe('CumpnormaComponent', () => {
  let component: CumpnormaComponent;
  let fixture: ComponentFixture<CumpnormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumpnormaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumpnormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
