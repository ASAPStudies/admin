import { DatePipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from "@angular/core";
import { IQuestion } from "src/app/pages/students/question.interface";
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
    
    ngOnInit(){
    }

}