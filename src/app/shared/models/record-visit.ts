import { VisitDetails } from "./visit-detail";
import { PatientDetail } from "./patient";
import { PaymentDetail } from "./payment-details";

export class RecortVisit {
    patientDetail: PatientDetail;
    visitDetails: VisitDetails[]=[];
    paymentDetail: PaymentDetail;
}