import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGantiNipComponent } from './modal-ganti-nip.component';

describe('ModalGantiNipComponent', () => {
  let component: ModalGantiNipComponent;
  let fixture: ComponentFixture<ModalGantiNipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGantiNipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGantiNipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
