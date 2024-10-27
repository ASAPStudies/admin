import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { AngJson2excelBtnModule } from 'ang-json2excel-btn';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from './icon/icon.module';
import { CustomToasterComponent } from '../custom/custom-toaster/custom-toaster.component';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'angular-custom-modal';
import { ProfileInfoComponent } from '../pages/students/student-profile/profile-info/profile-info.component';
import { QuestionsComponent } from '../pages/students/student-profile/questions/questions.component';
import { DocumentsComponent } from '../pages/tutors/tutor-profile/documents/documents.component';
import { SessionsComponent } from '../pages/students/student-profile/sessions/sessions.component';
import { Select2Component } from '../forms/select2';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    AngJson2excelBtnModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    ModalModule,NgSelectModule
  ],
  declarations: [CustomToasterComponent,ProfileInfoComponent,QuestionsComponent,DocumentsComponent,SessionsComponent],
  exports:[DataTableModule,AngJson2excelBtnModule,IconModule,FormsModule,ReactiveFormsModule,CustomToasterComponent,NgSelectModule ,ModalModule,ProfileInfoComponent,QuestionsComponent,DocumentsComponent,SessionsComponent]
})
export class SharedModule { }
