import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKalenderKerjaComponent } from './modal-kalender-kerja.component';

describe('ModalKalenderKerjaComponent', () => {
  let component: ModalKalenderKerjaComponent;
  let fixture: ComponentFixture<ModalKalenderKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalKalenderKerjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalKalenderKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
