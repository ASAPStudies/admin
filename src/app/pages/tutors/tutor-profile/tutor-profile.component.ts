import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../students/student.interface';
import { UsersService } from 'src/app/service/users.service';
import { IQuestion } from '../../students/question.interface';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubject, SharedService } from 'src/app/service/shared.service';
import { ISession } from '../../students/session.interface';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {


    activeTab = 'home';
    student:IStudent | null = null
    studentId:string = ''
    isLoading:boolean = false;
    questions:IQuestion[] = [];
    sessions:ISession[] = [];
    paymentRequests:any[] = [];

    // subjects:ISubject[] = [
    //     {
    //         "enabled": true,
    //         "name": "Advance Maths",
    //         "fcmTopic": "advmath",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "id": "z2bO2FlmEMCDGkPUrdCw"
    //     },
    //     {
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "name": "Basic Mathematics",
    //         "fcmTopic": "bmath",
    //         "enabled": true,
    //         "id": "Skeo6s5235k0nOU6Uthp"
    //     },
    //     {
    //         "name": "Civil Engineering",
    //         "enabled": true,
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "fcmTopic": "cveng",
    //         "id": "x8x6ioZ0y3tlGVRkJDSz"
    //     },
    //     {
    //         "enabled": true,
    //         "fcmTopic": "comeng",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "id": "GWFW14ezjgoDhEzNh1lb",
    //         "name": "Computer Engineering"
    //     },
    //     {
    //         "fcmTopic": "acct",
    //         "id": "QvPGR5A39zmICHrypkd0",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "name": "Accounting",
    //         "enabled": true
    //     },
    //     {
    //         "enabled": true,
    //         "fcmTopic": "antphy",
    //         "id": "fkNVZS7K5sU7s7GW2Yc2",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "name": "Anatomy and Physiology"
    //     },
    //     {
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "enabled": true,
    //         "name": "Biology",
    //         "fcmTopic": "bio",
    //         "id": "P0NCRT82WZPQUOiIBQwp"
    //     },
    //     {
    //         "enabled": true,
    //         "id": "tJAjGwOkOK7BBWePlRlZ",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "fcmTopic": "cheeng",
    //         "name": "Chemical Engineering"
    //     },
    //     {
    //         "id": "6nnaRXk3Lu2GBNpNtbFl",
    //         "name": "Chemistry",
    //         "enabled": true,
    //         "fcmTopic": "chemistry",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068"
    //     },
    //     {
    //         "name": "Economics",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "enabled": true,
    //         "fcmTopic": "econo",
    //         "id": "UnJuHln4NSlaY3F5rLzK"
    //     },
    //     {
    //         "fcmTopic": "elmath",
    //         "id": "XMkheXj2veBRuhl4l2GE",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "enabled": true,
    //         "name": "Elective Mathematics"
    //     },
    //     {
    //         "id": "QB0NCgQqsLoxRoLmWfQm",
    //         "fcmTopic": "eng",
    //         "name": "English",
    //         "enabled": true,
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068"
    //     },
    //     {
    //         "name": "Finance",
    //         "id": "jEFdoZD5FNWE8I13eAwj",
    //         "fcmTopic": "finance",
    //         "enabled": true,
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068"
    //     },
    //     {
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "fcmTopic": "intgsci",
    //         "enabled": true,
    //         "id": "GTOe5fdF8XRVxfT5vbcm",
    //         "name": "Integrated Science"
    //     },
    //     {
    //         "id": "QrHuGYvHS2PB9wKHJxMd",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "name": "Mathematics",
    //         "enabled": true,
    //         "fcmTopic": "math"
    //     },
    //     {
    //         "id": "789Rhm9oPmh0lTntg4p3",
    //         "fcmTopic": "nursing",
    //         "name": "Nursing",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "enabled": true
    //     },
    //     {
    //         "id": "yCON1lyHOEeYUQNCJVJq",
    //         "name": "calculus",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "enabled": true,
    //         "fcmTopic": "calculus"
    //     },
    //     {
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "fcmTopic": "eleceng",
    //         "name": "electrical engineering",
    //         "id": "vimvtWOOSSWQcsxulUg0",
    //         "enabled": true
    //     },
    //     {
    //         "fcmTopic": "stp",
    //         "name": "Statistics and Probability",
    //         "id": "5gQgMxVEbF649Ksb4XMY",
    //         "backgroundImgUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/subject_images%2Fistockphoto-636332456-612x612%201.png?alt=media&token=06669f84-0f67-4eda-a069-e7c82a1c6068",
    //         "enabled": true
    //     }
    // ];
    subjects:ISubject[] = []
    constructor(
      private userService:UsersService ,private localStorage:LocalStorageService,private activeRoute: ActivatedRoute,
      private route:Router,
  private sharedService:SharedService) {

      this.activeRoute.params.subscribe(params => {
          this.isLoading = true
          const id = params['uid'];
          this.studentId = id;
          this.student = this.localStorage.get('tutor') as IStudent
          if(!this.student || this.student.id != this.studentId){
              this.student = null
              this.getUser();
          }else{
              this.isLoading = false
          }
        });
      }

    ngOnInit() {
        this.fetchSubjects()
    }

    async getUser(){
      try {
          this.student = await this.userService.getUserByUID(this.studentId) as IStudent
          if(this.student){
              this.isLoading = false
              this.localStorage.set('tutor',this.student)
          }
      } catch (error) {
          this.isLoading = false
          console.log(error);

      }
    }

    async getUserQuestions(){
      try {
          this.isLoading = true;
          this.questions = await this.sharedService.getQuestionByTutorID(this.studentId)

          for (let index = 0; index < this.questions.length; index++) {
              const element = this.questions[index];
              let subject =  await this.sharedService.getSubjectByID(element.subject)
                  if(subject){
                      console.log(subject);
                      element.subject = subject.name
                  }
              if(element.status != 'Pending'){
                  let answerBy =  await this.userService.getUserByUID(element.studentId) as IStudent
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

    async getUserSessions(){
        try {
            this.isLoading = true;
            this.sessions = await this.sharedService.getSessionsByTutorID(this.studentId)
            console.log(this.sessions);


            for (let index = 0; index < this.sessions.length; index++) {
                const element = this.sessions[index];
                let subject =  await this.sharedService.getSubjectByID(element.subject)
                    if(subject){
                        console.log(subject);
                        element.subject = subject.name
                    }
                if(element.status != 'Pending'){
                    let answerBy =  await this.userService.getUserByUID(element.studentId) as IStudent
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

      async getWithdrawRequest() {
        try {
            this.isLoading = true;
            let requests = await this.sharedService.getWithdrawRequestWithStatus('all');
            for (let index = 0; index < requests.length; index++) {
                const element = requests[index];
                element['tutor'] = this.student;
                }
            this.paymentRequests = requests
            console.log(requests);

            this.isLoading=false;
        } catch (error) {
            this.isLoading=false;
            console.error('Error loading withdraw requests:', error);
        }
    }

    async fetchSubjects(){
        if(this.student && this.student.subjects){
        for (let index = 0; index < this.student?.subjects.length; index++) {
            let element = this.student?.subjects[index];
            this.subjects.push(await this.sharedService.getSubjectByID(element) as ISubject)
        }
        this.student.subjectObjs = this.subjects
    }
    }

    changeAccountStatus(){
        this.userService.updateAccountStatus(this.student?.onHold ?? false,this.studentId)
    }



    toggleTab(tabName:string){
      this.activeTab = tabName
      if(tabName == 'questions'){
          this.getUserQuestions()
      }
      if(tabName == 'sessions'){
        this.getUserSessions()
      }
      if(tabName == 'payment-requests'){
        this.getWithdrawRequest()
      }
    }

    deleteAccount(){
        alert('Coming Soon! we are working on that part.')
      }

}
