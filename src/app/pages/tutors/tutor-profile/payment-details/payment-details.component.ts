import { Component, Input, OnInit } from '@angular/core';
import { IStudent } from 'src/app/pages/students/student.interface';
import { UsersService } from 'src/app/service/users.service';
export interface IBankDetail {
    id: string;
    bankName: string;
    mobileMOneyNumber: string;
    accountNumber: string;
    accountTitle: string;
  }

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

    @Input() student:IStudent | null = null
    bankDetails:IBankDetail | null = null
    loading:boolean = false;
    constructor(private userService:UsersService) {
    }

    docType:string = '';
    ngOnInit() {
        this.student?.idImageurl.includes('pdf')?this.docType='pdf':'img'
        this.getBankDetails()
    }

    async getBankDetails(){
        this.loading = true
        try {
            this.bankDetails =  await this.userService.getTutorBankDetails(this.student?.id as string)
            this.loading = false
        } catch (error) {
            console.log(error);
            this.loading = false
        }
    }

}
