import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthUtils } from "src/app/shared/utils/auth.utils";

export const authGuard: CanActivateFn = (route, state)=> {
    const router = inject(Router)

    const url = (new URL(state.url, location.origin)).pathname
    const authUrls = ['/sign-in', '/sign-up']
    const isAuthUrl = authUrls.includes(url) 

    const existUser = AuthUtils.existUser()
    const existToken = AuthUtils.existToken()
    const isAuthenticated = existUser && existToken 

    // validar tambien que el token del usuario este listo
    if(isAuthenticated && !isAuthUrl){
        return true
    }

    if(!isAuthenticated && !isAuthUrl){
        router.navigate(['/sign-in'])
    }

    if(isAuthenticated && isAuthUrl){
        router.navigate(['/'])
    }

    return true;

}