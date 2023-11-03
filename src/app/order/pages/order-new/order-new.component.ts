import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { FormGroup } from '@angular/forms';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { OrderStatus } from '../../model/order_state.enum';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent {

  objPath: string = ""

  constructor(private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
  }

  onSaveChanges = (orderForm: FormGroup) => {
    const orderObj = orderForm.controls
    let newOrder = {
      title: orderObj['title'].value,
      estimate: orderObj['price'].value,
      limit: orderObj['limit'].value,
      details: orderObj['details'].value,
      clientID: AuthUtils.getCurrentUser()?.id,
      state: OrderStatus.INLINE,
      objPath: orderObj['objPath'].value
    }

    this.orderService.create(newOrder).subscribe(data => {
      this.router.navigate(['/order/all'])
    })
  }

  onCancelChanges = (_: FormGroup) => {
    this.router.navigate(['/order/all'])
  }

  onAfterTyping = (data: string) => {
    this.objPath = data
  }
}
