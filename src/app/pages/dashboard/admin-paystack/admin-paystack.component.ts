import { SharedService } from 'src/app/service/shared.service';
import { Component, ViewChild, AfterViewInit, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'angular-custom-modal';
import { ITutor } from '../../students/student.interface';
import { UsersService } from 'src/app/service/users.service';

@Component({
    selector: 'app-admin-paystack',
    templateUrl: './admin-paystack.component.html',
    styleUrls: ['./admin-paystack.component.css'],
})
export class AdminPaystackComponent implements  OnInit {
    selectedTutors: any = [];
    tutors: ITutor[] = [];
    isLoading: boolean = false;
    totalStudents: number = 0;
    totalTutors: number = 0;
    totalWithdrawRequests: number = 0;
    tab: string = 'home';
    allSelected: boolean = false;
    errorInPayment: boolean = false;
    search: any;
    paymentHistory: any;
    filteredTutorsList: ITutor[] = [];
    activeAdminTab: any = 'profile';
    @ViewChild('paymentModal') motherModal!: ModalComponent;

    constructor(private userService:UsersService, private readonly sharedService:SharedService){
  
    }

    paymentForm: any = new FormGroup({
        tutors: new FormControl([], this.allSelected ? Validators.required : null),
        payEveryone: new FormControl(false),
        amount: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,5})?$/)]),
    });

    onTutorSelection(event: any) {
        this.selectedTutors = event;
        this.paymentForm.patchValue({ tutors: this.selectedTutors });
    }

    toggleTab(tabName: string) {
        this.tab = tabName;
    }

    onPayAllChecked(event: any) {
        this.allSelected = event.target.checked;
        this.paymentForm.patchValue({ tutors: this.allSelected ? this.tutors : [] });
    }

    ngOnInit(): void {
        this.loadData()
    }
    

    async loadData() {
      this.tutors = await this.userService.getUsers("Tutor")
      console.log(this.tutors.length);
      this.filterTutors()
      
    }


    async filterTutors() {
        this.filteredTutorsList = this.tutors.filter((tutor: ITutor) => 
          tutor.isComplete === true && tutor.onHold === false);
       for (let tutor of this.filteredTutorsList) {
        let bank_details = await this.userService.getTutorBankDetails(tutor.id)
        if(bank_details !== null) {
          tutor['phone'] = bank_details.mobileMOneyNumber;
          
        }
      }
      this.filteredTutorsList = this.tutors.filter((tutor: ITutor) => tutor.phone.length > 0);
      console.log(this.filteredTutorsList)
    }

    openPaymentModal() {
        if (this.motherModal) {
            this.motherModal.open();
        }
    }

    closePaymentModal() {
        if (this.motherModal) {
            this.paymentForm.reset();
            this.motherModal.close();
            this.toggleTab('home');
        }
    }
}
