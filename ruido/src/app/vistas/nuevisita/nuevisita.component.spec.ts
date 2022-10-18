import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevisitaComponent } from './nuevisita.component';

describe('NuevisitaComponent', () => {
  let component: NuevisitaComponent;
  let fixture: ComponentFixture<NuevisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
