import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespasswordComponent } from './respassword.component';

describe('RespasswordComponent', () => {
  let component: RespasswordComponent;
  let fixture: ComponentFixture<RespasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
