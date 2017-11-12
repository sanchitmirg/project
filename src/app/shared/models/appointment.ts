import { PatientDetail } from "./patient";
import { ConsultantDetails } from "./consultant";

export class AppointmentDetails {
    id:number;
    patient: PatientDetail = new PatientDetail();
    consultant: ConsultantDetails = new ConsultantDetails();
    appointmentDate:Date;
    /* startTime:string;
    endTime:string; */
    notes:string;
    appointmentStartDate:Date;
    appointmentEndDate:Date;
}