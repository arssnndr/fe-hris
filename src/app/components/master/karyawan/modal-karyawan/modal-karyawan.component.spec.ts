import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKaryawanComponent } from './modal-karyawan.component';

describe('ModalKaryawanComponent', () => {
  let component: ModalKaryawanComponent;
  let fixture: ComponentFixture<ModalKaryawanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalKaryawanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalKaryawanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
