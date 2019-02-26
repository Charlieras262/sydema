import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAsignedTeacherComponent } from './courses-asigned-teacher.component';

describe('CoursesAsignedTeacherComponent', () => {
  let component: CoursesAsignedTeacherComponent;
  let fixture: ComponentFixture<CoursesAsignedTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesAsignedTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesAsignedTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
