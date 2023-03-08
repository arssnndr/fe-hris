import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetupJadwalKerjaCategoryComponent } from './modal-setup-jadwal-kerja-category.component';

describe('ModalSetupJadwalKerjaCategoryComponent', () => {
  let component: ModalSetupJadwalKerjaCategoryComponent;
  let fixture: ComponentFixture<ModalSetupJadwalKerjaCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetupJadwalKerjaCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSetupJadwalKerjaCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
