import { Component, Input } from "@angular/core";
import { IQuestion } from "src/app/pages/students/question.interface";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
    selector: 'q-detail',
    standalone: true,
    styleUrls: ['./question-detail.component.css'],
    templateUrl: './question-detail.component.html',
    imports:[SharedModule]
})
export class QuestionDetailCompoent {
      @Input() question:IQuestion|any;

}