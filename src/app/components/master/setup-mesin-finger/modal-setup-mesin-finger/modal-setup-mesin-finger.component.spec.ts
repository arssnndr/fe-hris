import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetupMesinFingerComponent } from './modal-setup-mesin-finger.component';

describe('ModalSetupMesinFingerComponent', () => {
  let component: ModalSetupMesinFingerComponent;
  let fixture: ComponentFixture<ModalSetupMesinFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetupMesinFingerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSetupMesinFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
