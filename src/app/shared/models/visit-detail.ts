import { PatientDetail } from "./patient";

export class VisitDetails {

    id:number;
    patient: PatientDetail;
    category: string;
    subcategory: string;
    amount: number;
    discount:number;
    netAmount:number;
    printBill:boolean;
    sendBill:boolean;
}