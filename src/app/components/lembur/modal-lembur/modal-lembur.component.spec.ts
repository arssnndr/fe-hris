import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLemburComponent } from './modal-lembur.component';

describe('ModalLemburComponent', () => {
  let component: ModalLemburComponent;
  let fixture: ComponentFixture<ModalLemburComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLemburComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLemburComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
