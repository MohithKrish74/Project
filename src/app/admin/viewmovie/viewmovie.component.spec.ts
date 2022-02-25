import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmovieComponent } from './viewmovie.component';

describe('ViewmovieComponent', () => {
  let component: ViewmovieComponent;
  let fixture: ComponentFixture<ViewmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
