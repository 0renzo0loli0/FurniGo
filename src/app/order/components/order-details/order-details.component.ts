import { Component, Input } from '@angular/core';
import { IUser, USER_ROLE } from 'src/app/user/model/user.interface';
import { OrderStatus } from '../../model/order_state.enum';

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

  getCurrentUser(): IUser | null {
    const user = localStorage.getItem('user');
    if(user != null){
      return JSON.parse(user) 
    }

    return null
  }

  getOrderClientName(){
    return "Cliente1"
  }

  getOrderExpertName(){
    if(this.status == OrderStatus.INLINE) return "En Cola"
    return "Experto1"
  }

  isClient(): boolean{
    const user = this.getCurrentUser()
    return user != null && user.role == USER_ROLE.client
  }
}
