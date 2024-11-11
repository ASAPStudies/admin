import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationComponent } from './notification.component';
import { PageLead } from 'src/app/elements/page-lead';

const routes: Routes = [
    { path: '', component: NotificationComponent, title: 'ASAP Admin | Notifications' },

];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    PageLead,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports:[SharedModule]
})
export class NotificationModule { }
