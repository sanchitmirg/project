import { PatientDetail } from "./patient";

export class PaymentDetail {
    id:number;
    patient: PatientDetail;
    amountPaid:number = 0;
    note:string;
}