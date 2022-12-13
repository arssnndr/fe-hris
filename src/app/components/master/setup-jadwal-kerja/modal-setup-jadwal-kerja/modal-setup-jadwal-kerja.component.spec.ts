import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetupJadwalKerjaComponent } from './modal-setup-jadwal-kerja.component';

describe('ModalSetupJadwalKerjaComponent', () => {
  let component: ModalSetupJadwalKerjaComponent;
  let fixture: ComponentFixture<ModalSetupJadwalKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetupJadwalKerjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSetupJadwalKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
