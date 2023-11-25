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
    this.orders = []

    const user = this.currentuser
    if (!user) return

    this.orderService.getAll(user.id).subscribe(orders=>{
      this.orders = orders;
    })

    // this.offerService.getAll().subscribe(reqOffer => {
    //   const expertOffers = reqOffer.filter(offer => offer.expertID == user.id)
    //   this.orderService.getAll().subscribe(reqOrder => {
    //     this.orders = reqOrder
    //       .filter(order =>
    //         expertOffers.some(offer => offer.orderID == order.id))
    //   })
    // })
  }

  get currentuser() {
    return AuthUtils.getCurrentUser()
  }
}
