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
          { path: 'new', component: OrderNewComponent },
          { path: 'edit', component: OrderEditComponent },
          { path: 'search', component: ButtonComponent },
          { path: 'offers', component: OffersComponent},
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
