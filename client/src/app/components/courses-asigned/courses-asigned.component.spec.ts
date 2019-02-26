import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAsignedComponent } from './courses-asigned.component';

describe('CoursesAsignedComponent', () => {
  let component: CoursesAsignedComponent;
  let fixture: ComponentFixture<CoursesAsignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesAsignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesAsignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
