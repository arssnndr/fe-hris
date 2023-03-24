import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilterDialogComponent } from './modal-filter-dialog.component';

describe('ModalFilterDialogComponent', () => {
  let component: ModalFilterDialogComponent;
  let fixture: ComponentFixture<ModalFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFilterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
