import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKehadiranComponent } from './list-kehadiran.component';

describe('ListKehadiranComponent', () => {
  let component: ListKehadiranComponent;
  let fixture: ComponentFixture<ListKehadiranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListKehadiranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListKehadiranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
