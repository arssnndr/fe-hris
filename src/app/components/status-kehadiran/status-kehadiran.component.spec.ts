import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusKehadiranComponent } from './status-kehadiran.component';

describe('StatusKehadiranComponent', () => {
  let component: StatusKehadiranComponent;
  let fixture: ComponentFixture<StatusKehadiranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusKehadiranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusKehadiranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
