import { Component } from '@angular/core';
import { OrderEntity } from '../../model/order.entity';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { OfferEntity } from '../../model/offer-entity';
import { USER_ROLE } from 'src/app/user/model/user.entity';
import { UserService } from 'src/app/user/services/user.service';
import { OrderStatus } from '../../model/order_state.enum';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent {
  currentOrder: OrderEntity = new OrderEntity();
  currenShowUserName: string = "Unknown";

  wasAccepted: boolean = true;
  expertExistOffer: boolean = false;

  get currentUser() {
    return AuthUtils.getCurrentUser()
  }

  constructor(private orderService: OrderService,
    private offerService: OfferService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const queryOrderID = this.route.snapshot.queryParamMap.get('code');
    if (!queryOrderID) return

    const orderID = Number(queryOrderID)
    this.orderService.getOne(orderID).subscribe(data => {
      this.currentOrder = OrderEntity.fromObj(data)
      const user = this.currentUser
      if (!user) return "Unknown"

      const role = user.role
      if (role == USER_ROLE.expert) {
        this.userService.getOne(this.currentOrder.clientID).subscribe(reqUser => {
          this.currenShowUserName = reqUser.name;
        })
        this.offerService.getAll().subscribe(reqOffer => {
          this.expertExistOffer = reqOffer
            .some(offer => offer.expertID == user.id && offer.orderID == this.currentOrder.id)
        })
        return
      }

      this.offerService.getAll().subscribe(reqOffer => {
        const offers = reqOffer.filter(offer => offer.orderID == this.currentOrder.id);
        const acceptedOffer = offers.find(offer => offer.accepted)
        this.wasAccepted = Boolean(acceptedOffer);
        if (acceptedOffer) {
          this.userService.getOne(acceptedOffer.expertID).subscribe(reqUser => {
            this.currenShowUserName = reqUser.name;
          })
        }
      })

      return;
    })
  }

  getShowUser() {
    const user = this.currentUser
    if (!user) return "Unknown"

    const role = user.role

    if (role == USER_ROLE.client && this.currentOrder.state == OrderStatus.INLINE) {
      return "En Cola"
    }

    return this.currenShowUserName
  }

  isClient(){
    const user = this.currentUser
    if (!user) return false;

    return user.role == USER_ROLE.client
  }
}
