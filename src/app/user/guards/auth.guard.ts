import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthUtils } from "src/app/shared/utils/auth.utils";

export const authGuard: CanActivateFn = (route, state)=> {
    const router = inject(Router)
    const existUser = AuthUtils.existUser()
    const existToken = AuthUtils.existToken()

    // validar tambien que el token del usuario este listo
    if(!existUser || !existToken){
        router.navigate(['/sign-in'])
    }

    return true;

}