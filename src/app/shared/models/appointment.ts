import { PatientDetail } from "./patient";
import { ConsultantDetails } from "./consultant";

export class AppointmentDetails {
    id:number;
    patient: PatientDetail;
    consultant: ConsultantDetails;
    appointmentDate:Date;
    startTime:string;
    endTime:string;
    note:string;
    
}