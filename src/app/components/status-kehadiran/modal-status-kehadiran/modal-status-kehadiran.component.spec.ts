import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatusKehadiranComponent } from './modal-status-kehadiran.component';

describe('ModalStatusKehadiranComponent', () => {
  let component: ModalStatusKehadiranComponent;
  let fixture: ComponentFixture<ModalStatusKehadiranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStatusKehadiranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStatusKehadiranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
