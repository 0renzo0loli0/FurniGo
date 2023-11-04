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

    this.orderService.getAll().subscribe(reqOrder => {
      this.offerService.getAll().subscribe(reqOffer => {
        this.orders = reqOrder.filter(order => {
          if(order.state == OrderStatus.CANCELLED || order.state == OrderStatus.FINISHED || order.state == OrderStatus.DONE) return false;
          const offers = reqOffer.filter(offer=> offer.orderID == order.id)
          if(offers.length == 0) return true;

          if(offers.some(offer=>offer.accepted || offer.expertID == user.id)) return false;

          if(offers.some(offer=> offer.expertID == user.id)) return false;

          return true;
        })
      })
    })
  }

  get currentuser() {
    return AuthUtils.getCurrentUser()
  }
}
