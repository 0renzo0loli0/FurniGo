import { Component, OnInit } from '@angular/core';
import { OrderEntity } from '../../model/order.entity';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OfferService } from '../../services/offer.service';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';

@Component({
  selector: 'app-order-offer',
  templateUrl: './order-offer.component.html',
  styleUrls: ['./order-offer.component.css']
})
export class OrderOfferComponent {
  currentOrder: OrderEntity = new OrderEntity();
  get currenUser(){
    return AuthUtils.getCurrentUser()
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private offerService: OfferService) { }

  ngOnInit() {
    const queryOrderID = this.route.snapshot.queryParamMap.get('code');
    if (!queryOrderID) return

    const orderID = Number(queryOrderID)

    this.orderService.getOne(orderID).subscribe(data => {
      this.currentOrder = OrderEntity.fromObj(data)
    })
  }

  onSaveChanges = (orderForm: FormGroup) => {
    const user = this.currenUser
    if(!user) return 

    const orderObj = orderForm.controls

    const nOffer = {
      orderId: this.currentOrder.id,
      expertId: user.id,
      price: orderObj['price'].value,
      date: orderObj['limit'].value,
    }

    this.offerService.create(nOffer).subscribe(data => {
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

  onAfterTyping = ({name, file}: {name: string, file: File}) => {
    // this.currentOrder.objName = name
  }
}
