import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPerusahaanComponent } from './modal-perusahaan.component';

describe('ModalPerusahaanComponent', () => {
  let component: ModalPerusahaanComponent;
  let fixture: ComponentFixture<ModalPerusahaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPerusahaanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPerusahaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
