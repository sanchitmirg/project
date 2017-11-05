import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs";
import { User } from "../shared/models/user";
import { ApiService } from "./api.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    userProfile: any;
    id_token:any;

    constructor(
        private http: Http,
        private api: ApiService,
        public router: Router
    ) { }

    login(user) {
        this.http.post(this.api.BASE_URL + 'user/authenticate', JSON.stringify(user), {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .map((res: Response) => {
                console.log("The response from server is", res.json())
                return res.json();
            }).subscribe((response)=>{
                console.log("The response from server 2 is", response)
                this.handleAuthentication(response);
            })
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        // this.userProfile = JSON.parse(localStorage.getItem('profile'))
        /* if (localStorage.getItem('access_token')) {
            return true
        } else {
            return false;
        } */

        this.id_token = localStorage.getItem('id_token')

        if(this.id_token){
            return true
        }else {
            return false
        }


    }

    handleAuthentication(data){
        console.log("the data is",data)
        if(data.code === 200){
            localStorage.setItem('id_token','123456')
            this.router.navigate(['']);
        }
    }

}