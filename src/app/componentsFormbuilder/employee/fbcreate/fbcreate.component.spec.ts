import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FBcreateComponent } from './fbcreate.component';

describe('FBcreateComponent', () => {
  let component: FBcreateComponent;
  let fixture: ComponentFixture<FBcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FBcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FBcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
