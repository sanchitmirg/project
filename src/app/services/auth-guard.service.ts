import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.authenticated()) {
            console.log("Inside auth guard if block")
            return true;
        } else {
            console.log("Inside auth guard else block")
            // this.router.navigate(['/login']);
            return true;
        }
    }

}