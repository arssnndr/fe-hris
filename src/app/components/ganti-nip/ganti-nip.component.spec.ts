import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GantiNipComponent } from './ganti-nip.component';

describe('GantiNipComponent', () => {
  let component: GantiNipComponent;
  let fixture: ComponentFixture<GantiNipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GantiNipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GantiNipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
