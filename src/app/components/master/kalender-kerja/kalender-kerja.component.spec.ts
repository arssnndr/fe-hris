import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalenderKerjaComponent } from './kalender-kerja.component';

describe('KalenderKerjaComponent', () => {
  let component: KalenderKerjaComponent;
  let fixture: ComponentFixture<KalenderKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KalenderKerjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KalenderKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
