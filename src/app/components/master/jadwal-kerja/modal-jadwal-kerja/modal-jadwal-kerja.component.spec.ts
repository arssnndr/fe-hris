import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJadwalKerjaComponent } from './modal-jadwal-kerja.component';

describe('ModalJadwalKerjaComponent', () => {
  let component: ModalJadwalKerjaComponent;
  let fixture: ComponentFixture<ModalJadwalKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalJadwalKerjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalJadwalKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
