import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../model/order.interface';
import { OrderState } from '../../model/order_state.enum';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css']
})
export class OrderAllComponent implements OnInit {
  orders: Array<IOrder> = []

  ngOnInit(): void {
    for (let i of Array(20).keys()) {
      this.orders.push({
        orderID: i,
        clientID: i*1000/15%20,
        estimate: i*1000/52%20,
        limit: new Date(),
        title: "Order " + i,
        state: OrderState.DONE
      })
    }
  }
}
