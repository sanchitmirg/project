import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { PatientDetail } from '../shared/models/patient';
import { Http,Headers, Response } from '@angular/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-quick-add-patient',
  templateUrl: './quick-add-patient.component.html',
  styleUrls: ['./quick-add-patient.component.scss']
})
export class QuickAddPatientComponent implements OnInit {

  patientDetail: PatientDetail = new PatientDetail();
  loading:boolean = false;

  genders = [
    { value: 'm', viewValue: 'Male' },
    { value: 'f', viewValue: 'Female' },
    { value: 'o', viewValue: 'Others' }
  ];

  constructor(
    public dialogRef: MdDialogRef<QuickAddPatientComponent>,
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    console.log("The quick add data to be saved is", this.patientDetail)
    this.loading = true;
    this.http.post(this.api.BASE_URL + 'patient/save', JSON.stringify(this.patientDetail), {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .map((res: Response) => {
        console.log("The response from patient save server is", res.json())
        this.loading = false;
        this.patientDetail = new PatientDetail();
        this.dialogRef.close();
        return res.json();
      })
      .subscribe(
        (data) => {console.log("The data is",data); this.loading= false},
        (err) => this.loading = false
      )
      
  }

}
