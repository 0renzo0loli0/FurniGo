import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthUtils } from './shared/utils/auth.utils';
import { USER_ROLE, UserEntity } from './user/model/user.entity';

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
  AuthUtils = AuthUtils

  title = 'FurniGo';
  subtitle = 'Pagina Actual'

  constructor(private router: Router) { }

  get currentUser(){
    return AuthUtils.getCurrentUser()
  }

  ngOnInit(): void {
    this.chooseSubtitle()
  }

  getNavButtonOptions() {
    const user = this.currentUser
    if (user != null) {
      return {
        content: user.role == USER_ROLE.client ? "Nuevo Pedido" : "Buscar Pedidos",
        redirectTo: user.role == USER_ROLE.client ? "/order/new" : "/order/search"
      }
    }

    return {
      content: 'Unknown',
      redirectTo: '/sign-in'
    }
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

  logout(event: Event){
    localStorage.removeItem('currentUser')   
    localStorage.removeItem('token')   
    this.router.navigate(['/sign-in'])
  }
}
