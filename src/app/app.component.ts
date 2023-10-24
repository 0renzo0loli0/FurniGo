import { Component, OnInit } from '@angular/core';
import { IUser, USER_ROLE } from './user/model/user.interface';

interface NavButton {
  content?: string
  redirectTo?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FurniGo';

  buttons: Array<NavButton> = [{
    content: 'Unknown',
    redirectTo: '/'
  }, {
    content: 'Unknown',
    redirectTo: '/'
  }]

  ngOnInit(): void {
    localStorage.setItem('user', JSON.stringify({
      id: 0,
      name: 'renzo',
      role: USER_ROLE.client
    } as IUser))

    const user = this.getCurrentUser()
    if (user != null) {
      this.buttons = [
        {
          content: 'Mis Pedidos',
          redirectTo: '/order/all'
        },
        {
          content: user.role == USER_ROLE.client ? "Nuevo Pedido" : "Buscar Pedidos",
          redirectTo: user.role == USER_ROLE.client ? "/order/new" : "/order/all"
        }
      ]
    }
  }

  getCurrentUser(): IUser | null {
    const user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    }

    return null;
  }
}
