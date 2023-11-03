import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderViewControlComponent } from './order-view-control.component';

describe('OrderViewControlComponent', () => {
  let component: OrderViewControlComponent;
  let fixture: ComponentFixture<OrderViewControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderViewControlComponent]
    });
    fixture = TestBed.createComponent(OrderViewControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
