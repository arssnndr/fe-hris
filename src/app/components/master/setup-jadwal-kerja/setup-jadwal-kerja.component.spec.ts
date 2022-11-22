import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupJadwalKerjaComponent } from './setup-jadwal-kerja.component';

describe('SetupJadwalKerjaComponent', () => {
  let component: SetupJadwalKerjaComponent;
  let fixture: ComponentFixture<SetupJadwalKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupJadwalKerjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupJadwalKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
