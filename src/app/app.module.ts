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


@NgModule({
  declarations: [
    // Base components
    AppComponent,
    // Custom imports

    ButtonComponent,
    InputComponent,
    LoginComponent,
    RegisterComponent,
    UserTagComponent
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
