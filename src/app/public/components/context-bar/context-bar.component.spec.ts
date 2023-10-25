import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextBarComponent } from './context-bar.component';

describe('ContextBarComponent', () => {
  let component: ContextBarComponent;
  let fixture: ComponentFixture<ContextBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContextBarComponent]
    });
    fixture = TestBed.createComponent(ContextBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
