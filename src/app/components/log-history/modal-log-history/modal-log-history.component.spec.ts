import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLogHistoryComponent } from './modal-log-history.component';

describe('ModalLogHistoryComponent', () => {
  let component: ModalLogHistoryComponent;
  let fixture: ComponentFixture<ModalLogHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLogHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLogHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
