import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { ApiService } from '../../services/api.service';
import { Http, Headers, Response } from '@angular/http';
import { PatientDetail } from '../../shared/models/patient';

@Component({
  selector: 'app-patientsearch',
  templateUrl: './patientsearch.component.html',
  styleUrls: ['./patientsearch.component.scss']
})
export class PatientsearchComponent implements OnInit {
  filteredPatients: any[]=[];
  patients: any[]=[];

  patient: PatientDetail = new PatientDetail();

  constructor(
    public dialogRef: MdDialogRef<PatientsearchComponent>,
    private _router: Router,
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
    this.loadPatients();
  }

  cancel(){
    this.dialogRef.close();
  }

  loadPatients() {
    console.log("inside load patients function")
    this.http.get(this.api.BASE_URL + 'patientDetails')
      .map((res: Response) => {
         return res.json()['_embedded']['patientDetails'];
      }).subscribe((response) => {
        this.patients = response;
        console.log("The final resonse for patient", this.patients)
        this.filteredPatients = this.patients;
        
      })
  }

  filterPatients = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredPatients = this.patients.filter((e: any) => {
      return (!filterText || e.firstname.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  displayPatientName(data: any) {
    return data ? data.firstname : data;
  }

  fetchPatient(patient:any){
    this.patient =  patient;
  }

  recordVisit(){
    this._router.navigate(['/visit/create/'+this.patient.id]);
    this.dialogRef.close();
  }
}
