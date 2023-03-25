import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetupJadwalKerjaDetailComponent } from './modal-setup-jadwal-kerja-detail.component';

describe('ModalSetupJadwalKerjaDetailComponent', () => {
  let component: ModalSetupJadwalKerjaDetailComponent;
  let fixture: ComponentFixture<ModalSetupJadwalKerjaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetupJadwalKerjaDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSetupJadwalKerjaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
