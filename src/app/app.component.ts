import { Component, OnInit } from '@angular/core';
import { IUser, USER_ROLE } from './user/model/user.interface';
import { NavigationEnd, Router } from '@angular/router';

interface NavButton {
  content: string
  redirectTo: string
}

const routeSubtitle: { [key: string]: string } = {
  "/sign-in": "Iniciar Sesion",
  "/sign-up": "Registrarse",
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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.chooseSubtitle()
  }

  getCurrentUser(): IUser | null {
    const user = this.getStorageUser();
    if (user != null) {
      return JSON.parse(user);
    }

    return null;
  }

  existUser(){
    const user = this.getStorageUser()
    return user != null
  }

  getNavButtonOptions() {
    const user = this.getCurrentUser()
    if (user != null) {
      return {
        content: user.role == USER_ROLE.client ? "Nuevo Pedido" : "Buscar Pedidos",
        redirectTo: user.role == USER_ROLE.client ? "/order/new" : "/order/all"
      }
    }

    return {
      content: 'Unknown',
      redirectTo: '/sign-in'
    }
  }

  getStorageUser(): string | null{
    return localStorage.getItem('currentUser')
  }

  chooseSubtitle() {
    // añadir el evento que escuchara los cambios de routing
    this.router.events.subscribe((val) => {
      // escuchar cuando la navegacion ya fue establecida
      if (val instanceof NavigationEnd) {
        // crear un constructor de la url solo tener el path y no las query params
        const url = new URL(val.urlAfterRedirects, location.origin)
        // buscar el subtitulo para la barra de contexto segun el routing path actual
        this.subtitle = routeSubtitle[url.pathname] || "Pagina Desconocida"
      }
    })
  }
}
