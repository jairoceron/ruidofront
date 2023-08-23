import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderetiqueComponent } from './headeretique.component';

describe('HeaderComponent', () => {
  let component: HeaderetiqueComponent;
  let fixture: ComponentFixture<HeaderetiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderetiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderetiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
