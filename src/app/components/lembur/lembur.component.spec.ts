import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LemburComponent } from './lembur.component';

describe('LemburComponent', () => {
  let component: LemburComponent;
  let fixture: ComponentFixture<LemburComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LemburComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LemburComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
