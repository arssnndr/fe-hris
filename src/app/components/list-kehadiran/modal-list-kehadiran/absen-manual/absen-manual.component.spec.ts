import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenManualComponent } from './absen-manual.component';

describe('AbsenManualComponent', () => {
  let component: AbsenManualComponent;
  let fixture: ComponentFixture<AbsenManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
