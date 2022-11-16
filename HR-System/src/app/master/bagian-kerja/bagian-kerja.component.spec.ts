import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagianKerjaComponent } from './bagian-kerja.component';

describe('BagianKerjaComponent', () => {
  let component: BagianKerjaComponent;
  let fixture: ComponentFixture<BagianKerjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagianKerjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagianKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
