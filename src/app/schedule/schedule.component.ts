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

  filteredPatients: any[] = [];
  patients: any[] = [];

  consultants: any[] = [];
  filteredConsultants: any[] = [];

  patient: PatientDetail = new PatientDetail();
  appointment: AppointmentDetails = new AppointmentDetails();

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

  onFromTimeChange(value){
    console.log("The selected time is", value)
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

  save() {
    console.log("the schedule is", this.appointment)
    this.http.post(this.api.BASE_URL + 'appointment/save', JSON.stringify(this.appointment), {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .map((res: Response) => {
        console.log("The response from appointment save server is", res.json())
        return res.json();
      }).subscribe((response) => {
        console.log("The response from server 2 is", response)
        // this.handleAuthentication(response);
      })
  }

}
