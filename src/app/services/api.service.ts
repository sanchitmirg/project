import { environment } from "../environments/environments";

export class ApiService {
    BASE_URL = '';

    constructor(){
        this.BASE_URL = environment.API_URL;
    }
}