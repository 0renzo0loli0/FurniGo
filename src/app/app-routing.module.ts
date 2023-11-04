import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './shared/components/button/button.component';
import { OrderAllComponent } from './order/pages/order-all/order-all.component';
import { OrderInfoComponent } from './order/pages/order-info/order-info.component';
import { UserProfileComponent } from './user/pages/user-profile/user-profile.component';
import { SignUpComponent } from './user/pages/sign-up/sign-up.component';
import { SignInComponent } from './user/pages/sign-in/sign-in.component';
import { authGuard } from './user/guards/auth.guard';
import { OrderEditComponent } from './order/pages/order-edit/order-edit.component';
import { OrderNewComponent } from './order/pages/order-new/order-new.component';
import { OffersComponent } from './order/pages/offers/offers.component';
import { OrderSearchComponent } from './order/pages/order-search/order-search.component';
import { OrderOfferComponent } from './order/pages/order-offer/order-offer.component';
import { clientGuard } from './user/guards/client.guard';
import { expertGuard } from './user/guards/expert.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'order/all', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'profile', component: UserProfileComponent },
      {
        path: 'order', children: [
          { path: 'all', component: OrderAllComponent },
          { path: 'info', component: OrderInfoComponent },
          { path: 'new', component: OrderNewComponent, canActivate: [clientGuard] },
          { path: 'offers', component: OffersComponent, canActivate: [clientGuard] },
          { path: 'edit', component: OrderEditComponent, canActivate: [expertGuard] },
          { path: 'search', component: OrderSearchComponent, canActivate: [expertGuard] },
          { path: 'offer', component: OrderOfferComponent, canActivate: [expertGuard] },
        ],
      }
    ],
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
