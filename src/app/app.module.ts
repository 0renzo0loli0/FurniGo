import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';
import { LoginComponent } from './public/pages/login/login.component';
import { RegisterComponent } from './public/pages/register/register.component';
import { UserTagComponent } from './public/components/user-tag/user-tag.component';
import { ContextBarComponent } from './public/components/context-bar/context-bar.component';
import { OrderItemCardComponent } from './order/components/order-item-card/order-item-card.component';
import { OrderAllComponent } from './order/pages/order-all/order-all.component';
import { OrderInfoComponent } from './order/pages/order-info/order-info.component';
import { StatusTagComponent } from './order/components/status-tag/status-tag.component';
import { OrderDetailsComponent } from './order/components/order-details/order-details.component';


@NgModule({
  declarations: [
    // Base components
    AppComponent,

    // Custom imports
    ButtonComponent,
    InputComponent,
    LoginComponent,
    RegisterComponent,
    UserTagComponent,
    ContextBarComponent,
    OrderItemCardComponent,
    OrderAllComponent,
    OrderInfoComponent,
    StatusTagComponent,
    OrderDetailsComponent
  ],
  imports: [
    // Helper imports
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // material imports
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule, // !TODO - REVISAR SI SE USA
    MatIconModule,
    MatInputModule,
    MatSelectModule, // !TODO - REVISAR SI SE USA
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
