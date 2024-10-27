import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationComponent } from './notification.component';

const routes: Routes = [
    { path: '', component: NotificationComponent, title: 'ASAP Admin | Notifications' },
    // { path: ':key', component: RequestDetailComponent, title: 'ASAP Admin | Withdraw Requests Detail' },

];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports:[SharedModule]
})
export class NotificationModule { }
