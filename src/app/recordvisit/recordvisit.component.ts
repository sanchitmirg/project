import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PatientDetail } from '../shared/models/patient';
import { VisitDetails } from '../shared/models/visit-detail';
import { PaymentDetail } from '../shared/models/payment-details';
import { RecortVisit } from '../shared/models/record-visit';



@Component({
  selector: 'app-recordvisit',
  templateUrl: './recordvisit.component.html',
  styleUrls: ['./recordvisit.component.scss']
})
export class RecordvisitComponent implements OnInit {

  patientId: number;
  patientDetail: PatientDetail = new PatientDetail();

  visitDetail: VisitDetails = new VisitDetails();
  visitDetails: VisitDetails[] = [];

  paymentDetails: PaymentDetail = new PaymentDetail();

  recordVisit: RecortVisit = new RecortVisit();

  subcategories: any[] = [];
  items: Object[] = [{
    id: 1,
    title: 'General',
  },
  {
    id: 2,
    title: 'Extraction',
  },
  ];



  constructor(
    private api: ApiService,
    private http: Http,
    private _route: ActivatedRoute,
  ) {
    this._route.params.subscribe((params: { id: string }) => {
      console.log("tenantId", params.id);
      this.patientId = +params.id
      if (this.patientId) {
        this.fetchPatientById(this.patientId)
      }
    });
  }

  ngOnInit() {
  }

  fetchPatientById(patientId) {
    this.http.get(this.api.BASE_URL + '/patientDetails/' + this.patientId, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .map((res: Response) => {
        return res.json();
      }).subscribe((response) => {
        this.patientDetail = response;
        this.visitDetail.patient = response;
        this.paymentDetails.patient = response;
        this.recordVisit.patientDetail = response;
        // this.handleAuthentication(response);
      })
  }

  category(item) {
    this.visitDetail = new VisitDetails();
    this.visitDetail.patient = this.patientDetail;
    this.visitDetail.category = item.title;

    this.http.get("/assets/" + item.id + ".json")
      .map((res: Response) => res.json()['general'])
      .subscribe((data) => {
        this.subcategories = data
      })
  }

  subcategory(subitem) {
    this.visitDetail = new VisitDetails();
    this.visitDetail.subcategory = subitem.name;
    this.visitDetail.patient = this.patientDetail;
    this.visitDetails.push(this.visitDetail);

  }

  deleteValue(i) {
    this.visitDetails.splice(i, 1)
  }

  addPrice(i, price, discount, final) {
    console.log("The recrod visit is", this.visitDetails[i])
    this.visitDetails[i].amount = price.value;
    this.visitDetails[i].discount = discount.value;
    this.visitDetails[i].netAmount = final.value;

    console.log("The recrod visit is", this.visitDetails)
  }

  saveRecordVisit() {

    this.recordVisit.paymentDetail = this.paymentDetails;
    this.recordVisit.visitDetails = this.visitDetails;
    console.log("The record data is", this.recordVisit)
    this.http.post(this.api.BASE_URL + 'visit/save', JSON.stringify(this.recordVisit), {
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

  cancel(){}

}
