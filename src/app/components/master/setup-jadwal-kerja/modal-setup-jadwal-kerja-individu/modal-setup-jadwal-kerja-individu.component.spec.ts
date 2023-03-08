import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetupJadwalKerjaIndividuComponent } from './modal-setup-jadwal-kerja-individu.component';

describe('ModalSetupJadwalKerjaIndividuComponent', () => {
  let component: ModalSetupJadwalKerjaIndividuComponent;
  let fixture: ComponentFixture<ModalSetupJadwalKerjaIndividuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetupJadwalKerjaIndividuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSetupJadwalKerjaIndividuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
