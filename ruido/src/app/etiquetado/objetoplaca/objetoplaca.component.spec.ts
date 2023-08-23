import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetoplacaComponent } from './objetoplaca.component';

describe('ObjetoplacaComponent', () => {
  let component: ObjetoplacaComponent;
  let fixture: ComponentFixture<ObjetoplacaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetoplacaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetoplacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
