import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ISubject, paymentKeys, SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';
import { IStudent } from '../students/student.interface';
import { IQuestion } from '../students/question.interface';
import { ISession } from '../students/session.interface';

const paystackInit = 'https://api.paystack.co/transaction/initialize'
const verifyTransaction = 'https://api.paystack.co/transaction/verify/'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

    loading:boolean = true;
    studentId:string = '';
    QuestionId:string = '';
    student!:IStudent;
    question!:IQuestion;
    session!:ISession;
    sessionId:string = '';
    trnxReference:string = '';
    transactionData:any;
    paymentKeys!:paymentKeys
    isSuccess:boolean = false;
    message:string= '';
    verificationMessage:string= '';

    constructor(private apiService:ApiService,private userService:UsersService,private sharedService:SharedService, private activeRoute:ActivatedRoute){
        this.activeRoute.queryParams.subscribe(params => {
            this.QuestionId = params['question'] || '';
            this.sessionId = params['session'] || '';
            this.trnxReference = params['trxref'] || '';

            if(this.trnxReference == '' && this.QuestionId == '' && this.sessionId == ''){
                this.message = 'Record not found!'
                this.isSuccess = false;
                this.loading = false;
                return
            }


            if(this.QuestionId){
              this.checkStudentAndQuestion(this.QuestionId)
            }
            if(this.sessionId){
                this.checkStudentAndQuestion(this.sessionId)
              }
            if(this.trnxReference){
                this.verifyPayment(this.trnxReference)
            }

          });
    }

    async getPaystackKeys(){
        this.paymentKeys = await this.sharedService.getPaymentKeys() as paymentKeys

        console.log(this.paymentKeys);

    }

    async checkStudentAndQuestion(id:string){
        try {
            if(this.QuestionId){
                let questionResult = await this.sharedService.getQuestionByID(id);
                if(questionResult == null){
                    this.message = 'Record not found!'
                    this.isSuccess = false;
                    this.loading = false;
                    return
                }

                if(questionResult.isPaid){
                    this.message = 'Payment already completed for requested question'
                    this.isSuccess = false;
                    this.loading = false;
                    return
                }

                this.question = questionResult
            }

            if(this.sessionId){
                let sessionResult = await this.sharedService.getSessionByID(id);
                if(sessionResult == null){
                    this.message = 'Record not found!'
                    this.isSuccess = false;
                    this.loading = false;
                    return
                }

                if(sessionResult.isPaid){
                    this.message = 'Payment already completed for requested session'
                    this.isSuccess = false;
                    this.loading = false;
                    return
                }

                this.session = sessionResult
            }

            let result = await this.userService.getUserByUID(this.QuestionId?this.question.studentId:this.session.studentId)
            if(result == null){
                this.isSuccess = false;
                this.loading = false;
                this.message = 'Your payment on Paystack has been declined. Please try with authenticated url.'
                return
            }

            this.student = result as IStudent
            this.makePayment();
        } catch (error:any) {
            this.message = 'Your payment on Paystack has been declined.' + error.message
            this.isSuccess == false;
            this.loading = false;

        }

    }

    subject!:ISubject
    async getSubjectDetail(){
        let subject = await this.sharedService.getSubjectByID(this.QuestionId?this.question.subject:this.session.subject)
        if(subject == null){
            this.message = 'Record not found!'
            this.isSuccess = false;
            this.loading = false;
            return
        }
        if(subject){
            this.subject = subject
        }
    }


    async makePayment(){
        await this.getPaystackKeys()
        let postData=
            {email:this.student.email,
                 amount:( (this.QuestionId?this.question.amount:this.session.amount) * 100).toString(),
                //  currency: this.QuestionId?this.question.currency:this.session.currency,
                 currency: 'GHS',
                 metadata: {QuestionId:this.QuestionId?this.QuestionId:'',sessionId:this.sessionId?this.sessionId:''}}

            this.apiService.postRequest(paystackInit,postData,this.paymentKeys.live?this.paymentKeys.live_secretkey:this.paymentKeys.test_secretkey).subscribe((res:any)=>{
            if(res.status){
                window.location.href = res.data.authorization_url
            }
        },
        error=>{
            this.message = 'Your payment on Paystack has been declined.' + error.message
            this.isSuccess = false;
            this.loading = false;

        })
    }

    async verifyPayment(transactionID:string){
        await this.getPaystackKeys()
        this.apiService.getRequest(verifyTransaction+transactionID,this.paymentKeys.test_secretkey).subscribe(async (res:any)=>{
            if(res.status){
                this.transactionData = res.data
                if(this.transactionData.metadata.QuestionId)
                this.QuestionId = this.transactionData.metadata.QuestionId
                if(this.transactionData.metadata.sessionId)
                this.sessionId = this.transactionData.metadata.sessionId


                if(this.QuestionId){
                    let questionResult = await this.sharedService.getQuestionByID(this.QuestionId);
                    if(questionResult == null){
                        this.message = 'Record not found!'
                        this.isSuccess = false;
                        this.loading = false;
                        return
                    }

                    if(questionResult.isPaid){
                        this.message = 'Payment already completed for requested question'
                        this.isSuccess = false;
                        this.loading = false;
                        return
                    }

                    this.question = questionResult
                }

                if(this.sessionId){
                    let sessionResult = await this.sharedService.getSessionByID(this.sessionId);
                    if(sessionResult == null){
                        this.message = 'Record not found!'
                        this.isSuccess = false;
                        this.loading = false;
                        return
                    }

                    if(sessionResult.isPaid){
                        this.message = 'Payment already completed for requested session'
                        this.isSuccess = false;
                        this.loading = false;
                        return
                    }

                    this.session = sessionResult
                }

                await this.getSubjectDetail()
                if(this.QuestionId)
                await this.userService.updateDocWithId('questions',this.QuestionId,{isPaid:true})
                else
                await this.userService.updateDocWithId('sessions',this.sessionId,{isPaid:true})

                await this.sharedService.sendNotification({title:'title',body:'body',token:this.subject.fcmTopic,isToken:false})

                this.isSuccess = true
                this.loading = false;
                this.message = 'Your payment on Paystack has been completed. You can now get updated on mobile app.'
            }else{
                this.message = 'Your payment on Paystack has been declined. Please try with authenticated url.'
                this.isSuccess = false;
                this.loading = false;
            }
        },error=>{
            this.message = 'Your payment on Paystack has been declined. Please try with authenticated url.'
            this.isSuccess = false;
            this.loading = false;
        })
    }

    closeTab() {
        window.self.close()
    }
}
