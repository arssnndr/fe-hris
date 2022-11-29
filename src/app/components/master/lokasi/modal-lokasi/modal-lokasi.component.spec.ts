import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLokasiComponent } from './modal-lokasi.component';

describe('ModalLokasiComponent', () => {
  let component: ModalLokasiComponent;
  let fixture: ComponentFixture<ModalLokasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLokasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLokasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
