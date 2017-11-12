import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Http, Headers, Response } from '@angular/http';
import { ApiService } from '../services/api.service';
import { PatientDetail } from '../shared/models/patient';
import { AppointmentDetails } from '../shared/models/appointment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  timeData: any[]=[];
  fTime:any;
  tTime:any;
  appDate: Date
  selectedFromTime: any;
  filteredPatients: any[] = [];
  patients: any[] = [];
  toTimeData:any[]=[];

  consultants: any[] = [];
  filteredConsultants: any[] = [];

  patient: PatientDetail = new PatientDetail();
  appointment: AppointmentDetails = new AppointmentDetails();

  date:any;
  month:any;
  year:any;

  fromTime: Date;
  toTime: Date;

  successful: boolean = false;

  constructor(
    public dialogRef: MdDialogRef<ScheduleComponent>,
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
    this.loadPatients();
    this.loadConsultants();

    this.callTimeFunction();
  }

  callTimeFunction() {
    this.http.get("/assets/time.json")
      .map((res: Response) => res.json()['general'])
      .subscribe((data) => {
        this.timeData = data
        console.log("Time data is", this.timeData)
      })
  }

  onFromTimeChange(){
    this.toTimeData =[];
    for(let i =0; i<=this.timeData.length; i++){
      if(this.timeData[i].time === this.fTime){
        this.selectedFromTime = this.timeData[i];
        break;
      }
        
    }

    for(let i =this.selectedFromTime.id; i<=this.timeData.length; i++){
      this.toTimeData.push(this.timeData[i])
    }
    console.log("The to time data is", this.toTimeData)
  }

  particularTime(element) {
    return 
  }


  loadPatients() {
    this.http.get(this.api.BASE_URL + 'patientDetails')
      .map((res: Response) => {
        return res.json()['_embedded']['patientDetails'];
      }).subscribe((response) => {
        this.patients = response;
        this.filteredPatients = this.patients;

      })
  }

  filterPatients = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredPatients = this.patients.filter((e: any) => {
      return (!filterText || e.firstname.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  filterConsultants = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredConsultants = this.consultants.filter((e: any) => {
      return (!filterText || e.firstname.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  loadConsultants() {
    this.http.get(this.api.BASE_URL + 'consultantDetails')
      .map((res: Response) => res.json()['_embedded']['consultantDetails'])
      .subscribe((data) => {
        this.consultants = data;
        this.filteredConsultants = this.consultants;
      })
  }

  displayConsultantName(data: any) {
    return data ? data.name : data;
  }

  cancel() {
    this.dialogRef.close();
  }

  fetchPatient(patient: any) {
    this.patient = patient;
    this.appointment.patient = this.patient;
  }

  fetchConsultant(c) {
    this.appointment.consultant = c;
  }

  displayPatientName(data: any) {
    return data ? data.firstname : data;
  }

  dateSelected(date){
    this.date = date.date.getDate(date.date)
    this.month = date.date.getMonth(date.date)
    this.year = date.date.getFullYear(date.date)
  }

  save() {

    var i = this.fTime.indexOf(':')
    var j = this.tTime.indexOf(':')
    this.fromTime = new Date(this.year, this.month, this.date, this.fTime.slice(0,i), this.fTime.slice(i+1));
    this.toTime = new Date(this.year, this.month, this.date, this.tTime.slice(0,i), this.tTime.slice(i+1));

    this.appointment.appointmentStartDate = this.fromTime;
    this.appointment.appointmentEndDate = this.toTime;

    console.log("The appointment object is", this.appointment);

    this.http.post(this.api.BASE_URL + 'appointment/save', JSON.stringify(this.appointment), {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .map((res: Response) => {
        console.log("The response from appointment save server is", res.json())
        return res.json();
      }).subscribe((response) => {
        this.appointment = new AppointmentDetails();
        console.log("The response from server 2 is", response)
        if(response.code === 200)
        this.successful = true;
        // this.handleAuthentication(response);
      })
  }

}
