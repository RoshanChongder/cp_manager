import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PltformsComponent } from './pltforms.component';

describe('PltformsComponent', () => {
  let component: PltformsComponent;
  let fixture: ComponentFixture<PltformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PltformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PltformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
