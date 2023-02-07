import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDataPayrollComponent } from './download-data-payroll.component';

describe('DownloadDataPayrollComponent', () => {
  let component: DownloadDataPayrollComponent;
  let fixture: ComponentFixture<DownloadDataPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDataPayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadDataPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
