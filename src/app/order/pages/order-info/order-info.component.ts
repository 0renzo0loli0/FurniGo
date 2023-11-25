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
    const user = this.currentUser;
    if (user == null) return;

    const queryOrderID = this.route.snapshot.queryParamMap.get('code');
    if (!queryOrderID) return

    const orderID = Number(queryOrderID)
    this.orderService.getOne(orderID).subscribe(order => {
      this.currentOrder = order;
      this.offerService.getAll(orderID).subscribe(offers => {
        const acOffer = offers.find(offer => offer.offer.accepted);

        this.wasAccepted = (user.role == USER_ROLE.expert) || acOffer != undefined;
        if (this.wasAccepted) {
          if (user.role == USER_ROLE.client) {
            this.currenShowUserName = acOffer?.user.name || "Unknown"
            this.currenShowUserName += " / "
            this.currenShowUserName += acOffer?.user.phone || "none"
          }
          else if (user.role == USER_ROLE.expert) {
            this.currenShowUserName = "Cliente"

            // añadir ruta de busqueda de usuario
          }
        }

        if (user.role == USER_ROLE.expert)
          this.expertExistOffer = offers.some(
            offer => offer.offer.expertID == this.currentUser?.id
          )

        if (user.role == USER_ROLE.client)
          this.expertExistOffer = acOffer != undefined;
        this.expertIsAcceptedOffer = acOffer?.user.id == user.id
      })

    })
  }

  getShowUser() {
    const user = this.currentUser
    if (!user) return "No User"

    const role = user.role

    if (role == USER_ROLE.client && this.currentOrder.state == OrderStatus.INLINE) {
      return "En Cola"
    }

    return this.currenShowUserName
  }

  isClient() {
    const user = this.currentUser
    if (!user) return false;

    return user.role == USER_ROLE.client
  }

  cancelOrder(event: Event) {
    this.currentOrder.state = OrderStatus.CANCELLED;
    this.orderService.cancel(this.currentOrder.id).subscribe(reqOrder => {
      this.router.navigate(['/order/all'])
    })
  }

  finishClientOrder(event: Event) {
    this.currentOrder.state = OrderStatus.DONE;
    this.orderService.done(this.currentOrder.id).subscribe(reqOrder => {
      this.router.navigate(['/order/all'])
    })
  }

  finishExpertOrder(event: Event) {
    this.currentOrder.state = OrderStatus.FINISHED;
    this.orderService.finish(this.currentOrder.id).subscribe(reqOrder => {
      this.router.navigate(['/order/all'])
    })
  }
}
