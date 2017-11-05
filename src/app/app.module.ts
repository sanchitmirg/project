import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API } from '../config/api.config';

import { routedComponents, AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { USER_PROVIDER, USERS_API } from './users';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DatepickerModule } from 'angular2-material-datepicker';
import { QuickAddPatientComponent } from './quick-add-patient/quick-add-patient.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ApiService } from './services/api.service';
import { RecordvisitComponent } from './recordvisit/recordvisit.component';
import { PatientsearchComponent } from './recordvisit/patientsearch/patientsearch.component';





const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    AddPatientComponent,
    QuickAddPatientComponent,
    ScheduleComponent,
    RecordvisitComponent,
    PatientsearchComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    DatepickerModule,
    SharedModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title, {
      provide: USERS_API, useFactory: getAPI,
    }, 
    USER_PROVIDER,
    AuthGuardService,
    AuthService,
    ApiService
  ], // additional providers needed for this module
  entryComponents: [ 
    QuickAddPatientComponent,
    ScheduleComponent,
    PatientsearchComponent
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
