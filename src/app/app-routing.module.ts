import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { ProductOverviewComponent } from './dashboard-product/overview/overview.component';
import { ProductStatsComponent } from './dashboard-product/stats/stats.component';
import { ProductFeaturesComponent } from './dashboard-product/features/features.component';
import { FeaturesFormComponent } from './dashboard-product/features/form/form.component';
import { LogsComponent } from './logs/logs.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { RecordvisitComponent } from "./recordvisit/recordvisit.component";



const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '', component:MainComponent,
        canActivate: [AuthGuardService],
        children:[
            {
                component: DashboardComponent,
                path: ''
            },
            {
                path:'addpatient',
                component: AddPatientComponent
                
            },
            {
                path:'visit/create/:id',
                component: RecordvisitComponent
                
            }

        ]
    }
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false }),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    MainComponent, LoginComponent,
    DashboardComponent, DashboardProductComponent,
    FormComponent, LogsComponent, DetailComponent,
    FeaturesFormComponent, ProductFeaturesComponent, ProductOverviewComponent, ProductStatsComponent,
];
