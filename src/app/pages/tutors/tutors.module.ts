import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { TutorsComponent } from './tutors.component';
import { PendingReviewTutorsListComponent } from './pending-review-tutors-list/pending-review-tutors-list.component';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
import { DocumentsComponent } from './tutor-profile/documents/documents.component';
import { PaymentDetailsComponent } from './tutor-profile/payment-details/payment-details.component';
import { PaymentRequestsComponent } from './tutor-profile/payment-requests/payment-requests.component';

const routes: Routes = [
    { path: 'all', component: TutorListComponent, title: 'ASAP Admin | Tutors' },
    { path: 'pending', component: PendingReviewTutorsListComponent, title: 'ASAP Admin | Pending Review Tutors' },
    { path: ':uid', component: TutorProfileComponent, title: 'ASAP Admin | Tutor Profile' },

];

@NgModule({
  declarations: [TutorListComponent,TutorsComponent,PendingReviewTutorsListComponent,TutorProfileComponent,PaymentDetailsComponent, PaymentRequestsComponent,PaymentRequestsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports:[SharedModule]
})
export class TutorsModule { }
