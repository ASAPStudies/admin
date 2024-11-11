import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../question.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
],

})
export class QuestionsComponent implements OnInit {

  activeTab:string = 'all'
  @Input() questions:any = [];
  filteredQuestions:IQuestion[] = [];
  selectedQuestion:IQuestion | null = null;
  selectedFileType:string = ''

  constructor(public _domSanitizer:DomSanitizer) { }

  ngOnInit() {
    console.log(this.questions);
    this.filteredQuestions = this.questions
  }

  toggleTab(tabName:string){
    this.activeTab = tabName;
    this.filteredQuestions = this.questions
    if(tabName == 'all'){
        return
    }
    this.filteredQuestions = this.filteredQuestions.filter(res => res.status == tabName)
  }

  onPanelOpen(attachmentUrl:string) {
    window.open(attachmentUrl, '_blank');
    // this.selectedFileType =
    // attachmentUrl.includes('.pdf')
    //     ? 'pdf'
    //     : 'image'
  }

  preventClose(event: MouseEvent): void {
    // Prevent the modal from closing when clicking on the backdrop
    event.stopPropagation();
  }

}
