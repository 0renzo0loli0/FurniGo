import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './shared/components/button/button.component';

const routes: Routes = [
  {path: '', redirectTo: 'order/all', pathMatch: 'full'},
  {path: 'profile', component: ButtonComponent},
  {path: 'order/all', component: ButtonComponent},
  {path: 'order/info', component: ButtonComponent},
  {path: 'order/new', component: ButtonComponent},
  {path: 'order/edit', component: ButtonComponent},
  {path: 'order/search', component: ButtonComponent},
  {path: 'offer/all', component: ButtonComponent},
  {path: 'offer/info', component: ButtonComponent},
  {path: 'offer/new', component: ButtonComponent},
  {path: 'offer/edit', component: ButtonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
