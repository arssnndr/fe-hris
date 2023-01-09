import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMesinFingerComponent } from './modal-mesin-finger.component';

describe('ModalMesinFingerComponent', () => {
  let component: ModalMesinFingerComponent;
  let fixture: ComponentFixture<ModalMesinFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMesinFingerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMesinFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
