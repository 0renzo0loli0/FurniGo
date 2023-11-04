import { Component, OnInit } from '@angular/core';
import { OrderStatus } from '../../model/order_state.enum';
import { OrderEntity } from '../../model/order.entity';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { OrderService } from '../../services/order.service';
import { USER_ROLE } from 'src/app/user/model/user.entity';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css']
})
export class OrderAllComponent implements OnInit {
  orders: Array<OrderEntity> = []

  constructor(private orderService: OrderService,
    private offerService: OfferService) { }

  ngOnInit(): void {
    const user = this.currentuser
    if (!user) return

    if (user.role == USER_ROLE.client) {
      this.orderService.getAll().subscribe(data => {
        this.orders = data.filter(order => { return order.clientID == user.id })
      })
      return;
    }

    this.offerService.getAll().subscribe(data => {
      const expertOffers = data.filter(offer => offer.expertID == user.id)
      this.orderService.getAll().subscribe(data => {
        this.orders = data.filter(order => { 
          return Boolean(expertOffers.find(offer => offer.orderID == order.id))
         })
      })
    })
  }

  get currentuser() {
    return AuthUtils.getCurrentUser()
  }
}
