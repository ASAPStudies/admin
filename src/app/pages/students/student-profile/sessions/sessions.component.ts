import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { IStudent } from '../../student.interface';
import { UsersService } from 'src/app/service/users.service';
import { ISession } from '../../session.interface';

export interface IMeeting {
    id: number;
    status: string;
    encrypted_password: string;
    host_email: string;
    topic: string;
    pstn_password: string;
    host_id: string;
    uuid: string;
    timezone: string;
    duration: number;
    type: number;
    start_url: string;
    join_url: string;
    pre_schedule: boolean;
    start_time: string;
    h323_password: string;
    password: string;
    created_at: string;
  }


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  activeTab:string = 'all'
  isLoading:boolean = false
  isMeetingLoading:boolean = false
  filteredSessions:ISession[]=[]
  selectedSession:ISession | null = null;

  meetingDetail:IMeeting | null = null;

  @Input() sessions:ISession[]=[]

  constructor(private sharedService:SharedService, private userService:UsersService) { }

  ngOnInit() {
    this.filteredSessions = this.sessions
  }



  async getMeetingDetails(){
    if(this.selectedSession){
        try {
            this.isMeetingLoading = true;
            this.meetingDetail = await this.sharedService.getMeetingDetailsBySessionID(this.selectedSession.id)
            console.log(this.meetingDetail);
            this.isMeetingLoading = false;
        } catch (error) {

        }
    }
  }

  toggleTab(tabName:string){
    this.activeTab = tabName;
    this.filteredSessions = this.sessions
    if(tabName == 'all'){
        return
    }
    this.filteredSessions =this.filteredSessions.filter(res=> res.status == tabName)
  }
}
