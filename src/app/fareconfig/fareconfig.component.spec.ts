import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareconfigComponent } from './fareconfig.component';

describe('FareconfigComponent', () => {
  let component: FareconfigComponent;
  let fixture: ComponentFixture<FareconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
