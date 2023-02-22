import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPerpanjangKontrakComponent } from './modal-perpanjang-kontrak.component';

describe('ModalPerpanjangKontrakComponent', () => {
  let component: ModalPerpanjangKontrakComponent;
  let fixture: ComponentFixture<ModalPerpanjangKontrakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPerpanjangKontrakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPerpanjangKontrakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
