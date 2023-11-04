import { Component, OnInit } from '@angular/core';
import { OfferEntity } from '../../model/offer-entity';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderEntity } from '../../model/order.entity';
import { OfferService } from '../../services/offer.service';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { UserService } from 'src/app/user/services/user.service';
import { UserEntity } from 'src/app/user/model/user.entity';
import { OrderStatus } from '../../model/order_state.enum';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  userOffers: Array<{ offer: OfferEntity, user: UserEntity }>;
  currentOrder: OrderEntity = new OrderEntity();
  get currentUser() {
    return AuthUtils.getCurrentUser();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private offerService: OfferService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userOffers = []
    const queryOrderID = this.route.snapshot.queryParamMap.get('code');
    if (!queryOrderID) return

    const orderID = Number(queryOrderID)
    this.orderService.getOne(orderID).subscribe(reqOrder => {
      this.currentOrder = OrderEntity.fromObj(reqOrder)
      this.offerService.getAll().subscribe(reqOffer => {
        const offers = reqOffer.filter(offer => offer.orderID == this.currentOrder.id)
        this.userService.getAll().subscribe(reqUser => {
          offers.forEach(offer => {
            const user = reqUser.find(user => user.id == offer.expertID)
            if (user)
              this.userOffers.push({
                offer: offer,
                user: user
              })
          })
        })
      })
    })
  }

  acceptOffer(offer: OfferEntity) {
    offer.accepted = true;
    this.currentOrder.estimate = offer.price
    this.currentOrder.limit = offer.limit
    this.currentOrder.state = OrderStatus.BUILDING;
    this.offerService.update(offer.id, offer).subscribe(res => {
      this.orderService.update(this.currentOrder.id, this.currentOrder).subscribe(resOrder => {
        this.router.navigate(['/order/info'], {
          queryParams: {
            code: this.currentOrder.id
          }
        })
      })
    })
  }
}
