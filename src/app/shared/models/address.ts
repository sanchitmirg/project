import { PatientDetail } from "./patient";

export class Address {
    id:number;
    patient: PatientDetail;
    country:string;
    state: string;
    city: string;
    street: string;
    pincode:string;
}