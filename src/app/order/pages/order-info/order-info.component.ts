import { Component } from '@angular/core';
import { OrderEntity } from '../../model/order.entity';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  expertExistOffer: boolean = true;
  expertIsAcceptedOffer: boolean = false;

  get currentUser() {
    return AuthUtils.getCurrentUser()
  }

  constructor(private orderService: OrderService,
    private offerService: OfferService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

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
          const offer = reqOffer
            .find(offer => offer.expertID == user.id && offer.orderID == this.currentOrder.id)
          this.expertExistOffer = Boolean(offer)
          this.expertIsAcceptedOffer = (!!offer && offer.accepted);
          console.log(this.expertExistOffer, this.expertIsAcceptedOffer)
        })
        return
      }

      this.offerService.getAll().subscribe(reqOffer => {
        const offers = reqOffer.filter(offer => offer.orderID == this.currentOrder.id);
        const acceptedOffer = offers.find(offer => offer.accepted)
        this.wasAccepted = (Boolean(acceptedOffer) || offers.length == 0);
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

  cancelOrder(event: Event){
    this.currentOrder.state = OrderStatus.CANCELLED;
    this.orderService.update(this.currentOrder.id, this.currentOrder).subscribe(reqOrder => {
      this.router.navigate(['/order/all'])
    })
  }

  finishClientOrder(event: Event){
    this.currentOrder.state = OrderStatus.DONE;
    this.orderService.update(this.currentOrder.id, this.currentOrder).subscribe(reqOrder => {
      this.router.navigate(['/order/all'])
    })
  }

  finishExpertOrder(event: Event){
    this.currentOrder.state = OrderStatus.FINISHED;
    this.orderService.update(this.currentOrder.id, this.currentOrder).subscribe(reqOrder => {
      this.router.navigate(['/order/all'])
    })
  }
}
