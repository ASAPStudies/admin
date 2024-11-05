import { DashboardService } from './../../../service/dashboard.service';
import { DatePipe, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { SessionIconComponent } from "src/app/components/session.icon";
import { ISession } from "../../students/session.interface";
import { SharedService } from 'src/app/service/shared.service';
import { ActivatedRoute } from '@angular/router';
import { timeStamp } from 'console';

@Component({
    selector:'live-detail',
    standalone:true,
    templateUrl:"./live.component.html",
    imports:[SessionIconComponent, NgIf, DatePipe]

})
export class LiveDetailComponent implements OnInit{
    session!:any|ISession;
    currentSessionId!:string|null;
    currentSubject!:any;
    constructor(private dashboardService:DashboardService, private sharedService:SharedService, private activeRoute:ActivatedRoute){
    }
    ngOnInit(){
        this.currentSessionId = this.activeRoute.snapshot.paramMap.get("id")
        this.loadData()
    }
    async loadData(){
        this.session = await this.sharedService.getSessionByID(this.currentSessionId as string)
        this.currentSubject =await this.sharedService.getSubjectByID(this.session?.subject as string)
    }
}