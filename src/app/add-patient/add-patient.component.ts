import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { PatientDetail } from '../shared/models/patient';
import { ApiService } from '../services/api.service';
import { Address } from '../shared/models/address';
import { AppointmentDetails } from '../shared/models/appointment';
import { ConsultantDetails } from '../shared/models/consultant';
import { PatientData } from '../shared/models/patientdata';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit, AfterViewInit {

  genders = [
    { value: 'm', viewValue: 'Male' },
    { value: 'f', viewValue: 'Female' },
    { value: 'o', viewValue: 'Others' }
  ];

  weightUnits = [
    { value: 'kg', viewValue: 'KG' },
    { value: 'lb', viewValue: 'LB' },
  ];

  heightUnits = [
    { value: 'cm', viewValue: 'CM' },
    { value: 'ft', viewValue: 'FT' },
  ];

  bloodGroups = [
    { value: 'ab+', viewValue: 'AB+' },
    { value: 'ab-', viewValue: 'AB-' },
    { value: 'b+', viewValue: 'B+' },
    { value: 'b-', viewValue: 'B-' },
    { value: 'a+', viewValue: 'A+' },
    { value: 'a-', viewValue: 'A-' },
    { value: 'o+', viewValue: 'O+' },
    { value: 'o-', viewValue: 'O-' },
  ];

  languages = [
    { value: 'english', viewValue: 'English' },
    { value: 'hindi', viewValue: 'Hindi' },
    { value: 'gujarati', viewValue: 'Gujarati' },

  ];

  filteredPatients: any[]=[];
  patients: any[]=[];

  countries: any[] = [];
  filteredCountries: any[] = [];

  states: any[] = [];
  filteredStates: any[] = [];

  consultants: any[] = [];
  filteredConsultants: any[] = [];

  patient: PatientDetail = new PatientDetail();
  address: Address = new Address()
  appointmentDetails: AppointmentDetails = new AppointmentDetails();
  consultant: ConsultantDetails = new ConsultantDetails();
  patientData: PatientData = new PatientData()

  date:any;
  month:any;
  year:any;

  fromTime: Date;
  toTime: Date;
  timeData: any[]=[];
  fTime:any;
  tTime:any;
  toTimeData:any[]=[];
  selectedFromTime: any;

  disabled:any;

  constructor(
    private api: ApiService,
    private http: Http
  ) { }

  ngOnInit() {
    this.loadCountries();
    this.loadStates();
    this.loadConsultants();
    this.loadPatients();
    this.callTimeFunction();
  }

  ngAfterViewInit(): void {
    // this.media.broadcast();
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

  loadConsultants() {
    this.http.get(this.api.BASE_URL + 'consultantDetails')
      .map((res: Response) => res.json()['_embedded']['consultantDetails'])
      .subscribe((data) => {
        this.consultants = data;
        console.log("The consultant list is", data)
        this.filteredConsultants = this.consultants;

      })
  }

  filterConsultants = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredConsultants = this.consultants.filter((e: any) => {
      return (!filterText || e.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }
  loadCountries() {
    this.http.get("/assets/countries.json")
      .map((res: Response) => res.json()['countries'])
      .subscribe((data) => {
        this.countries = data;
        console.log("The country list", this.countries)
        this.filteredCountries = this.countries
      })
  }

  filterCountries = (filterTerm: string) => {
    const filterText: string = filterTerm.toLowerCase();
    this.filteredCountries = this.countries.filter((e: any) => {
      return (!filterText || e.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  displayProductName(data: any) {
    return data ? data.name : data;
  }

  displayConsultantName(data: any) {
    return data ? data.name : data;
  }

  fetchCountryName(c) {
    console.log("The country details are", c)
  }

  loadStates() {
    this.http.get("/assets/states.json")
      .map((res: Response) => res.json()['states'])
      .subscribe((data) => {
        this.states = data;
        console.log("The state list", this.states)
        this.filteredStates = this.states
      })

  }

  filterStates = (filterTerm: string) => {
    console.log("Inside filter states")
    const filterText: string = filterTerm.toLowerCase();
    this.filteredStates = this.states.filter((e: any) => {
      return (!filterText || e.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });
  }

  dateSelected(date){
    this.date = date.date.getDate(date.date)
    this.month = date.date.getMonth(date.date)
    this.year = date.date.getFullYear(date.date)
  }

  displayStateName(data: any) {
    return data ? data.name : data;
  }

  displayPatientName(data: any) {
    return data ? data.firstname : data;
  }

  fetchStateName(c) {
    console.log("The country details are", c)
    this.address.state = c.name;
  }

  fetchConsultant(c) {
    console.log("The consultant object is", c)
    this.appointmentDetails.consultant = c;
  }

  fetchPatient(patient:any){
    this.patient =  patient;
  }

  fetchCountry(c){
    this.address.country = c.name;
  }


  savePatient(patientdata) {
    var i = this.fTime.indexOf(':')
    var j = this.tTime.indexOf(':')
    this.fromTime = new Date(this.year, this.month, this.date, this.fTime.slice(0,i), this.fTime.slice(i+1));
    this.toTime = new Date(this.year, this.month, this.date, this.tTime.slice(0,i), this.tTime.slice(i+1));

    this.appointmentDetails.appointmentStartDate = this.fromTime;
    this.appointmentDetails.appointmentEndDate = this.toTime;

    this.patientData.patientDetail = this.patient;
    this.patientData.addressDetail = this.address;
    this.patientData.appointmentDetail = this.appointmentDetails;

    console.log("The patient data 2 is",this.patientData)


    this.savePatientHttpCall(this.patientData)
  }

  savePatientHttpCall(patient) {
    this.http.post(this.api.BASE_URL + 'patient/saveDetails', JSON.stringify(patient), {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .map((res: Response) => {
        console.log("The response from patient save server is", res.json())
        return res.json();
      }).subscribe((response) => {
        console.log("The response from server 2 is", response)
        // this.handleAuthentication(response);
      })
  }

  cancel(){ }
}
