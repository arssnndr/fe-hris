import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetupJadwalKerjaUploadComponent } from './modal-setup-jadwal-kerja-upload.component';

describe('ModalSetupJadwalKerjaUploadComponent', () => {
  let component: ModalSetupJadwalKerjaUploadComponent;
  let fixture: ComponentFixture<ModalSetupJadwalKerjaUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetupJadwalKerjaUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSetupJadwalKerjaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
