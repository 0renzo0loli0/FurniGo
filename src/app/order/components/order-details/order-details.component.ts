import { Component, Input } from '@angular/core';
import { OrderStatus } from '../../model/order_state.enum';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { USER_ROLE } from 'src/app/user/model/user.entity';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() title: string;
  @Input() code: number;
  @Input() status: OrderStatus;
  @Input() limit: Date;
  @Input() maxBudget: number;
  @Input() user: string;
  @Input() details: string;

  hasOffer = false;

  constructor() {
    this.title = "Mesa de Noche";
    this.code = 123456;
    this.status = OrderStatus.INLINE;
    this.limit = new Date();
    this.maxBudget = 150.00;
    this.user = "Carpintería Manuel";
    this.details = "Mesa de noche de madera de abeto.";
  }

  getOrderClientName(){
    return AuthUtils.getCurrentUser()?.name
  }

  getOrderExpertName(){
    if(this.status == OrderStatus.INLINE) return "En Cola"
    return "Experto1"
  }

  isClient(): boolean{
    const user = AuthUtils.getCurrentUser()
    return user != null && user.role == USER_ROLE.client
  }
}
