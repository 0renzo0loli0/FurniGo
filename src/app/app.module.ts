import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';

import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';
import { UserTagComponent } from './public/components/user-tag/user-tag.component';
import { ContextBarComponent } from './public/components/context-bar/context-bar.component';
import { OrderItemCardComponent } from './order/components/order-item-card/order-item-card.component';
import { OrderAllComponent } from './order/pages/order-all/order-all.component';
import { OrderInfoComponent } from './order/pages/order-info/order-info.component';
import { StatusTagComponent } from './order/components/status-tag/status-tag.component';
import { OrderDetailsComponent } from './order/components/order-details/order-details.component';
import { UserProfileComponent } from './user/pages/user-profile/user-profile.component';
import { SignInComponent } from './user/pages/sign-in/sign-in.component';
import { SignUpComponent } from './user/pages/sign-up/sign-up.component';
import { AuthenticationService } from './user/services/authentication.service';
import { CommonModule } from '@angular/common';
import { OrderEditComponent } from './order/pages/order-edit/order-edit.component';
import { OrderFormComponent } from './order/components/order-form/order-form.component';
import { OrderNewComponent } from './order/pages/order-new/order-new.component';
import { OrderViewComponent } from './order/components/order-view/order-view.component';
import { OrderViewControlComponent } from './order/components/order-view-control/order-view-control.component';
import { OffersComponent } from './order/pages/offers/offers.component';
import { OfferCardComponent } from './order/components/offer-card/offer-card.component';
import { OrderSearchComponent } from './order/pages/order-search/order-search.component';
import { OrderOfferComponent } from './order/pages/order-offer/order-offer.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { NothingThereComponent } from './shared/components/nothing-there/nothing-there.component';



@NgModule({
  declarations: [
    // Base components
    AppComponent,

    // Custom imports
    ButtonComponent,
    InputComponent,
    UserTagComponent,
    ContextBarComponent,
    OrderItemCardComponent,
    OrderAllComponent,
    OrderInfoComponent,
    StatusTagComponent,
    OrderDetailsComponent,
    UserProfileComponent,
    SignInComponent,
    SignUpComponent,
    OrderEditComponent,
    OrderFormComponent,
    OrderNewComponent,
    OrderViewComponent,
    OrderViewControlComponent,
    OffersComponent,
    OfferCardComponent,
    OrderSearchComponent,
    OrderOfferComponent,
    PageNotFoundComponent,
    NothingThereComponent,
  ],
  imports: [
    // Helper imports
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    // material imports
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatGridListModule,
    MatRadioModule,
    MatNativeDateModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
