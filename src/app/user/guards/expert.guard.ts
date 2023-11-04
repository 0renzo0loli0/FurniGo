import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthUtils } from "src/app/shared/utils/auth.utils";
import { USER_ROLE } from "../model/user.entity";

export const expertGuard: CanActivateFn = (route, state)=> {
    const router = inject(Router)

    const user = AuthUtils.getCurrentUser();
    if(!user) return true;

    if(user.role == USER_ROLE.client){
        router.navigate(['/order/all'])
    }

    return true;

}