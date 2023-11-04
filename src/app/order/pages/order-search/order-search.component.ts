import { Component, OnInit } from '@angular/core';
import { OrderStatus } from '../../model/order_state.enum';
import { OrderEntity } from '../../model/order.entity';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { OrderService } from '../../services/order.service';
import { USER_ROLE } from 'src/app/user/model/user.entity';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent {
  orders: Array<OrderEntity> = []

  constructor(private orderService: OrderService,
    private offerService: OfferService) { }

  ngOnInit(): void {
    const user = this.currentuser
    if (!user) return

    this.offerService.getAll().subscribe(reqOffer => {
      const offers = reqOffer.filter(offer => offer.accepted)
      this.orderService.getAll().subscribe(reqOrder => {
        this.orders = reqOrder.filter(order => { 
          const oOffers = offers.filter(offer => offer.orderID == order.id);
          return (oOffers.length == 0) || (offers.some(offer => !offer.accepted))
         })
      })
    })
  }

  get currentuser() {
    return AuthUtils.getCurrentUser()
  }
}
