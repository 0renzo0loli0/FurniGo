import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../model/order.interface';
import { OrderStatus } from '../../model/order_state.enum';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css']
})
export class OrderAllComponent implements OnInit {
  orders: Array<IOrder> = []

  ngOnInit(): void {
    for (let i of Array(29).keys()) {
      this.orders.push({
        orderID: i,
        clientID: i*1000/15%20,
        estimate: 100,
        limit: new Date(),
        title: "Order " + i,
        state: OrderStatus.BUILDING,
        details: "lorem ipsum dolor sit amet"
      })
    }
  }
}
