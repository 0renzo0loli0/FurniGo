import { Component, OnInit } from '@angular/core';
import { OrderStatus } from '../../model/order_state.enum';
import { OrderEntity } from '../../model/order.entity';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { OrderService } from '../../services/order.service';
import { USER_ROLE } from 'src/app/user/model/user.entity';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css']
})
export class OrderAllComponent implements OnInit {
  orders: Array<OrderEntity> = []

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const user = this.currentuser
    if (!user) return

    if (user.role == USER_ROLE.client) {
      this.orderService.getAll().subscribe(data => {
        console.log(data)
        this.orders = data.filter(order => { return order.clientID == user.id })
      })
    } 

    // !TODO: AÑADIR CUANDO LA LOGICA DE LA OFFERTA ESTE LISTA
    // else if (user.role == USER_ROLE.expert) {
    //   this.offerService.getAll().subscribe(data => {
    //     const expertOffers = data.map(offer => offer.expertID).filter(expertID => expertID == user.id)
    //     this.orderService.getAll().subscribe(data => {
    //       this.orders = data.filter(order => { return expertOffers.includes(order.orderID) })
    //     })
    //   })
    // }
  }

  get currentuser() {
    return AuthUtils.getCurrentUser()
  }
}
