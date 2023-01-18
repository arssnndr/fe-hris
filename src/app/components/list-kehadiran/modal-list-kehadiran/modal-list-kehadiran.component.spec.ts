import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListKehadiranComponent } from './modal-list-kehadiran.component';

describe('ModalListKehadiranComponent', () => {
  let component: ModalListKehadiranComponent;
  let fixture: ComponentFixture<ModalListKehadiranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListKehadiranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalListKehadiranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
