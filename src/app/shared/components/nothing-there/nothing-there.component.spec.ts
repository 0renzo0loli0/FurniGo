import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingThereComponent } from './nothing-there.component';

describe('NothingThereComponent', () => {
  let component: NothingThereComponent;
  let fixture: ComponentFixture<NothingThereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NothingThereComponent]
    });
    fixture = TestBed.createComponent(NothingThereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
