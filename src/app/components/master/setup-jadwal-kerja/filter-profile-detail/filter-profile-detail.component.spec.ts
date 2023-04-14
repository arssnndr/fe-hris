import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProfileDetailComponent } from './filter-profile-detail.component';

describe('FilterProfileDetailComponent', () => {
  let component: FilterProfileDetailComponent;
  let fixture: ComponentFixture<FilterProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProfileDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
