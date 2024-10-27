import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { WithdrawRequestsComponent } from './withdraw-requests.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';

const routes: Routes = [
    { path: '', component: WithdrawRequestsComponent, title: 'ASAP Admin | Withdraw Requests' },
    { path: ':key', component: RequestDetailComponent, title: 'ASAP Admin | Withdraw Requests Detail' },

];

@NgModule({
  declarations: [WithdrawRequestsComponent,RequestDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports:[SharedModule]
})
export class WithdrawRequestsModule { }
