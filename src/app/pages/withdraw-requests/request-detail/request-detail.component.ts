import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { doc, updateDoc } from 'firebase/firestore';
import { UsersService } from 'src/app/service/users.service';
import { firebaseDb } from 'src/configurations/firebase-config';
import { IStudent } from '../../students/student.interface';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {


    requestDetail:any = null;
    reason:string = ''
    formSubmission:boolean = false;
    loading:boolean = false;
  constructor(public location:Location,private router:Router,private userService:UsersService,private sharedService:SharedService) {
    this.requestDetail = JSON.parse(localStorage.getItem('request')||'false')
    if(!this.requestDetail){
        router.navigate(['/withdraw-requests'])
    }
   }

  ngOnInit() {
  }

  async payNow(){
    try {
        this.loading = true

        const tutor = await this.userService.getUserByUID(this.requestDetail.requested_by) as IStudent | null
        console.log(tutor);
        console.log(this.requestDetail);


        if(tutor && tutor.balance < this.requestDetail.amount){
            alert('Tutor Balance is Low, you can delete it')
            return
        }

        //update balance
        let updatedBalance = (tutor?.balance ?? 0) - this.requestDetail.amount

        this.userService.updateDocWithId('users',this.requestDetail.requested_by,{balance:updatedBalance})
        if(tutor?.balance)
        tutor.balance = updatedBalance
        this.requestDetail.tutor = tutor
        //update status
        this.userService.updateDocWithId('withdraws_requests',this.requestDetail.id, {
            status: 'Completed',
            updatedOn:new Date()
        })

        this.userService.updateDocWithId(`users/${this.requestDetail.requested_by}/withdraws`,this.requestDetail.profile_request_id, {
            status: 'Completed',
            updatedOn:new Date()
        })


        this.requestDetail.status = 'Completed'

        //send notification

        this.sharedService.sendNotification({title:'Withdraw Request Approved',body:'Your requested payment transferred',token:tutor?.fcmToken || ''})

    } catch (error) {
        console.log(error);

    } finally{
        this.loading = false
    }
  }

  submitReason(){
    if(this.reason){
          console.log(this.reason);

    }
  }

  ngOnDestroy(){
    localStorage.removeItem('request')
  }

}
