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
  @Input() details: string;
  @Input() nextUserName: string;

  @Input() wasAccepted = false;

  constructor() {
    this.title = "Unknown";
    this.code = -1;
    this.status = OrderStatus.INLINE;
    this.limit = new Date();
    this.maxBudget = 0;
    this.details = "Unknown";
    this.nextUserName = "Unknown"
  }

  isClient(): boolean{
    const user = AuthUtils.getCurrentUser()
    return user != null && user.role == USER_ROLE.client
  }
}
