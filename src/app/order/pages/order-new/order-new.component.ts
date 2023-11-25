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

  file: File | null = null;

  constructor(private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
  }

  onSaveChanges = (orderForm: FormGroup) => {
    const orderObj = orderForm.controls
    const user = AuthUtils.getCurrentUser()
    const file = this.file
    if (user == null || file == null) return;

    let newOrder = {
      title: orderObj['title'].value,
      estimate: orderObj['price'].value,
      limit: orderObj['limit'].value,
      details: orderObj['details'].value,
      clientId: user.id,
      state: OrderStatus.INLINE
    }

    const nFormData = new FormData();
    nFormData.append("file", file);

    this.orderService.create(newOrder).subscribe(data => {
      this.orderService.appendDesign(data.id, nFormData).subscribe(res => {
        this.router.navigate(['/order/all'])
      })
    })
  }

  onCancelChanges = (_: FormGroup) => {
    this.router.navigate(['/order/all'])
  }

  onAfterTyping = ({ name, file }: { name: string, file: File }) => {
    this.file = file
  }
}
