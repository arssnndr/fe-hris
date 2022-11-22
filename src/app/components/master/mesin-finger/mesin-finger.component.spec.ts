import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesinFingerComponent } from './mesin-finger.component';

describe('MesinFingerComponent', () => {
  let component: MesinFingerComponent;
  let fixture: ComponentFixture<MesinFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesinFingerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesinFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
