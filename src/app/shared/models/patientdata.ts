import { PatientDetail } from "./patient";
import { Address } from "./address";
import { AppointmentDetails } from "./appointment";

export class PatientData {
    patientDetail: PatientDetail = new PatientDetail();
    addressDetail: Address = new Address();
    appointmentDetail: AppointmentDetails = new AppointmentDetails();
}