import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOfferComponent } from './order-offer.component';

describe('OrderOfferComponent', () => {
  let component: OrderOfferComponent;
  let fixture: ComponentFixture<OrderOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderOfferComponent]
    });
    fixture = TestBed.createComponent(OrderOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
