import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBagianKerjaComponent } from './modal-bagian-kerja.component';

describe('ModalBagianKerjaComponent', () => {
  let component: ModalBagianKerjaComponent;
  let fixture: ComponentFixture<ModalBagianKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBagianKerjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBagianKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
