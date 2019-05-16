import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaltestelleComponent } from './haltestelle.component';

describe('HaltestelleComponent', () => {
  let component: HaltestelleComponent;
  let fixture: ComponentFixture<HaltestelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaltestelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaltestelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
