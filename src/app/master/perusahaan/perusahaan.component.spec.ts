import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerusahaanComponent } from './perusahaan.component';

describe('PerusahaanComponent', () => {
  let component: PerusahaanComponent;
  let fixture: ComponentFixture<PerusahaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerusahaanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerusahaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
