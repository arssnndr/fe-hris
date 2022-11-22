import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalKerjaComponent } from './jadwal-kerja.component';

describe('JadwalKerjaComponent', () => {
  let component: JadwalKerjaComponent;
  let fixture: ComponentFixture<JadwalKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JadwalKerjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JadwalKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
