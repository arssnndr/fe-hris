import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOtoritasComponent } from './modal-otoritas.component';

describe('ModalOtoritasComponent', () => {
  let component: ModalOtoritasComponent;
  let fixture: ComponentFixture<ModalOtoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOtoritasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOtoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
