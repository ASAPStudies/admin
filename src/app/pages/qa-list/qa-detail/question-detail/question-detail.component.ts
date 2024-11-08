import { DatePipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from "@angular/core";
import { IQuestion } from "src/app/pages/students/question.interface";
import { DashboardService } from 'src/app/service/dashboard.service';
import { SharedService } from 'src/app/service/shared.service';
import { SharedModule } from "src/app/shared/shared.module";

@Component({
    selector: 'q-detail',
    standalone: true,
    styleUrls: ['./question-detail.component.css'],
    templateUrl: './question-detail.component.html',
    imports:[NgIf, SharedModule, DatePipe]
})
export class QuestionDetailCompoent implements OnInit {
    @Input() question:IQuestion|any;
    subJect:any;
    constructor(private sharedService: SharedService){}
    ngOnInit(){
        this.loadData()
    }

    async loadData(){
        this.subJect = await this.sharedService.getSubjectByID(this.question?.subject)
    }
}