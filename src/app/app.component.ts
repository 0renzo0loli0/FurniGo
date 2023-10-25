import { Component, OnInit } from '@angular/core';
import { IUser, USER_ROLE } from './user/model/user.interface';
import { NavigationEnd, Router } from '@angular/router';

interface NavButton {
  content: string
  redirectTo: string
}

const routeSubtitle: {[key: string]: string} = {
  "/profile": "Mi Perfil",
  "/order/all": "Mis Ordenes",
  "/order/info": "Mi Orden",
  "/order/new": "Nueva Orden",
  "/order/edit": "Editar Orden",
  "/order/search": "Buscar Ordenes",
  "/offer/all": "Mis Ofertas",
  "/offer/info": "Mi Oferta",
  "/offer/new": "Nueva Oferta",
  "/offer/edit": "Editar Oferta"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FurniGo';
  subtitle = 'Pagina Actual'

  buttons: Array<NavButton> = [{
    content: 'Unknown',
    redirectTo: '/'
  }, {
    content: 'Unknown',
    redirectTo: '/'
  }]

  constructor(private router: Router){}

  ngOnInit(): void {
    this.chooseSubtitle()

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

  chooseSubtitle(){
    // añadir el evento que escuchara los cambios de routing
    this.router.events.subscribe((val)=>{
      // escuchar cuando la navegacion ya fue establecida
      if(val instanceof NavigationEnd ){
        // crear un constructor de la url solo tener el path y no las query params
        const url = new URL(val.urlAfterRedirects, location.origin)
        // buscar el subtitulo para la barra de contexto segun el routing path actual
        this.subtitle = routeSubtitle[url.pathname] || "Pagina Desconocida"
      }
    })
  }
}
