import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { QuickAddPatientComponent } from '../quick-add-patient/quick-add-patient.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { PatientsearchComponent } from "../recordvisit/patientsearch/patientsearch.component";

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
    title: 'Add Patient',
    route: '/addpatient',
    icon: 'account_circle',
  },
  ];

  constructor(private _router: Router,
    private dialog: MdDialog, ) { }

  logout(): void {
    this._router.navigate(['/login']);
  }

  openPatientForm(): void {
    let dialogRef = this.dialog.open(QuickAddPatientComponent, {
      height: 'auto', // can be px or %
      width: '50%', // can be px or %
      disableClose: true,
    });
  }

  openSchedule(): void {
    let dialogRef = this.dialog.open(ScheduleComponent, {
      height: 'auto', // can be px or %
      width: '50%', // can be px or %
      disableClose: true,
    });
  }

  recordVisit(){
    let dialogRef = this.dialog.open(PatientsearchComponent, {
      height: 'auto', // can be px or %
      width: '50%', // can be px or %
      disableClose: true,
    });
  }

}