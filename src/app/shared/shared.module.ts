// import { KeysPipe } from './../pipes/keys.pipe';
// import { GroupByPipe } from './../pipes/group-by.pipe';
// import { MainComponent } from './../../main/main.component';
// import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {
  CovalentExpansionPanelModule,
  CovalentFileModule,
  CovalentStepsModule,
  CovalentLayoutModule,
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentMediaModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentNotificationsModule,
  CovalentMenuModule,
  CovalentLoadingModule,
  CovalentDialogsModule,
} from '@covalent/core';
// import { RequestInterceptor } from './../services/api/request.interceptor';
import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CovalentChartsModule } from '@covalent/charts';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

// import { CheckPermissionDirective } from "../directives/check-permission.directive";
// import { SecuredDirective } from "../directives/secured.directive";
// import { MetadataComponent } from "../metadata/metadata.component";
@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    CovalentCommonModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentMenuModule,
    CovalentNotificationsModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentDataTableModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentExpansionPanelModule,
    CovalentFileModule,
    CovalentStepsModule,
    // CovalentChartsModule,
    // CovalentHttpModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentMediaModule,
    NgxChartsModule,
    // Ng2AutoCompleteModule,
  ],
  declarations: [
    // GroupByPipe,
    // KeysPipe,
    // CheckPermissionDirective,
    // SecuredDirective,
    // MetadataComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CovalentCommonModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentMenuModule,
    CovalentNotificationsModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentDataTableModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentExpansionPanelModule,
    CovalentFileModule,
    CovalentStepsModule,
    // CovalentChartsModule,
    // CovalentHttpModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentMediaModule,
    NgxChartsModule,
    // Ng2AutoCompleteModule,
    // GroupByPipe,
    // KeysPipe,
    // CheckPermissionDirective,
    // SecuredDirective,
    // MetadataComponent
    
  ],

  providers: [
    // RequestInterceptor,
  ],
})
export class SharedModule { }
