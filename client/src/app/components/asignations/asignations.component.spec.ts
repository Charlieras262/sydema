import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationsComponent } from './asignations.component';

describe('AsignationsComponent', () => {
  let component: AsignationsComponent;
  let fixture: ComponentFixture<AsignationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
