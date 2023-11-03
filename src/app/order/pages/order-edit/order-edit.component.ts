import { Component, OnInit } from '@angular/core';
import { OrderEntity } from '../../model/order.entity';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  currentOrder: OrderEntity = new OrderEntity();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    const queryOrderID = this.route.snapshot.queryParamMap.get('code');
    if (!queryOrderID) return

    const orderID = Number(queryOrderID)

    this.orderService.getOne(orderID).subscribe(data => {
      this.currentOrder = OrderEntity.fromObj(data)
    })
  }

  onSaveChanges = (orderForm: FormGroup) => {
    const orderObj = orderForm.controls
    this.currentOrder.title = orderObj['title'].value
    this.currentOrder.estimate = orderObj['price'].value
    this.currentOrder.limit = orderObj['limit'].value
    this.currentOrder.details = orderObj['details'].value
    this.currentOrder.objPath = orderObj['objPath'].value

    this.orderService.update(this.currentOrder.id, this.currentOrder).subscribe(data => {
      this.returnToInfo()
    })
  }

  onCancelChanges = (_: FormGroup) => {
    this.returnToInfo()
  }

  returnToInfo = () => {
    this.router.navigate(['/order/info'], {
      queryParams: { code: this.currentOrder.id }
    })
  }

  onAfterTyping = (data: string) => {
    this.currentOrder.objPath = data
  }
}
