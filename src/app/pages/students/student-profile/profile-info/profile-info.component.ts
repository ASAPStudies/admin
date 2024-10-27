import { Component, Input, OnInit } from '@angular/core';
import { IStudent } from '../../student.interface';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() student:IStudent | null = null
  @Input() type:string = ''


  constructor(private userService:UsersService, private sharedService:SharedService) {
    // this.userService.updateDocWithId()
    // this.sharedService.sendNotification({
    //     title:'title',
    //     body:'Test Notification',
    //     token:'eDtMAyUSS5Gng4FozR1089:APA91bEOQ8-Ewm0C_-7Z-8LdyC_-8p35KM4WpCrk4-DYTkTHWsXz4Dw10Q8Yhr50vGUQuI5ir5PMAnk4zCCngQrrtiYiASH6Be6kZY7jdKyqSKaeA1qNQBH7FmOkN5CeQ2RjdSkBZwYI'
    // })

   }

  ngOnInit() {
    }

    changeAccountStatus(status:boolean,userId:string){
        this.userService.updateAccountStatus(status,userId)
    }



}



