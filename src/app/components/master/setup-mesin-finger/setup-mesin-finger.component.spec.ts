import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMesinFingerComponent } from './setup-mesin-finger.component';

describe('SetupMesinFingerComponent', () => {
  let component: SetupMesinFingerComponent;
  let fixture: ComponentFixture<SetupMesinFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupMesinFingerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupMesinFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
