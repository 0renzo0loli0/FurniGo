import { Component, Input } from '@angular/core';
import { OrderState } from '../../model/order_state.enum';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.css']
})
export class OrderItemCardComponent {
  @Input() title: string = 'Mesa de Noche'
  @Input() code: number = 127
  @Input() maxDate: Date = new Date()
  @Input() status: OrderState = OrderState.INLINE
  @Input() estimate: number = 250
  @Input() imgPath: string = "https://picsum.photos/200/300";
}
