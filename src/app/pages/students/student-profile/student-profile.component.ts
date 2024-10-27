import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IStudent } from '../student.interface';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { SharedService } from 'src/app/service/shared.service';
import { IQuestion } from '../question.interface';
import { ISession } from '../session.interface';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
],
})
export class StudentProfileComponent implements OnInit {

  activeTab = 'home';
  student:IStudent | null = null
  studentId:string = ''
  isLoading:boolean = false;
  questions:IQuestion[] = [];
  sessions:ISession[]=[];

  constructor(
    private userService:UsersService ,private localStorage:LocalStorageService,private activeRoute: ActivatedRoute,
    private route:Router,
private sharedService:SharedService) {

    this.activeRoute.params.subscribe(params => {
        this.isLoading = true
        const id = params['uid'];
        this.studentId = id;
        this.student = this.localStorage.get('student') as IStudent
        if(!this.student || this.student.id != this.studentId){
            this.student = null
            this.getUser();
        }else{
            this.isLoading = false
        }
      });
    }

  ngOnInit() {
  }

  async getUser(){
    try {
        this.student = await this.userService.getUserByUID(this.studentId) as IStudent
        if(this.student){
            this.isLoading = false
            this.localStorage.set('student',this.student)
        }
    } catch (error) {
        this.isLoading = false
        console.log(error);

    }
  }

  async getUserQuestions(){
    try {
        this.isLoading = true;
        this.questions = await this.sharedService.getQuestionByStudentID(this.studentId)

        for (let index = 0; index < this.questions.length; index++) {
            const element = this.questions[index];
            let subject =  await this.sharedService.getSubjectByID(element.subject)
                if(subject){
                    console.log(subject);
                    element.subject = subject.name
                }
            if(element.status != 'Pending'){
                let answerBy =  await this.userService.getUserByUID(element.answeyBy) as IStudent
                if(answerBy){
                    element.tutor = answerBy
                }
            }
        }

        console.log(this.questions);

        this.isLoading = false;

    } catch (error) {
        console.log(error);
        this.isLoading = false;
    }
  }

  async getUserSessions(userId:string){
    try {
        this.isLoading = true;
        this.sessions = await this.sharedService.getSessionsByStudentID(userId)
        console.log(this.sessions);


        for (let index = 0; index < this.sessions.length; index++) {
            const element = this.sessions[index];
            let subject =  await this.sharedService.getSubjectByID(element.subject)
                if(subject){
                    console.log(subject);
                    element.subject = subject.name
                }
            if(element.status != 'Pending'){
                let answerBy =  await this.userService.getUserByUID(element.acceptedBy) as IStudent
                if(answerBy){
                    element.tutor = answerBy
                }
            }
        }

        console.log(this.sessions);
        this.isLoading = false;

    } catch (error) {
        console.log(error);
        this.isLoading = false;
    }
  }



  toggleTab(tabName:string){
    this.activeTab = tabName
    if(tabName == 'questions'){
        this.getUserQuestions()
    }
    if(tabName == 'sessions'){
        this.getUserSessions(this.studentId)
    }
  }

  deleteAccount(){
    alert('Coming Soon! we are working on that part.')
  }

}
