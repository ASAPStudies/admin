import { SharedService } from 'src/app/service/shared.service';
import { Component, ViewChild, AfterViewInit, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'angular-custom-modal';
import { ITutor } from '../../students/student.interface';
import { UsersService } from 'src/app/service/users.service';
import { PaystackService } from 'src/app/service/paystack.service';
import { TransferRecieptReturnType, TransferResponse } from './paystact.interface';
import { convertToLocalNumber, createReadyReceipts, findNetwork } from './paystact.helper';
import { DashboardService } from 'src/app/service/dashboard.service';
import { LocalStorageService } from 'src/app/service/localstorage.service';

@Component({
    selector: 'app-admin-paystack',
    templateUrl: './admin-paystack.component.html',
    styleUrls: ['./admin-paystack.component.css'],
})
export class AdminPaystackComponent implements OnInit {
    selectedTutors: any = [];
    tutors: ITutor[] = [];
    isLoading: boolean = false;
    totalStudents: number = 0;
    totalTutors: number = 0;
    totalWithdrawRequests: number = 0;
    tab: string = 'home';
    allSelected: boolean = false;
    errorInPayment: boolean = true;
    search: any;
    paymentHistory: any;
    filteredTutorsList: ITutor[] = [];
    activeAdminTab: any = 'profile';
    allRecipts: any[] = [];
    transactionsHistory: any[] = [];
    payStackTransactions: any[] = [];
    erroMsg: string = '';
    fallback: boolean = false;
    paymentLoading:boolean = false
    loggedInUser:any = {}
    failedTutorsList:any[] = []


    @ViewChild('paymentModal') motherModal!: ModalComponent;
    @ViewChild('alertModal') alertModal!: ModalComponent;

    cols = [
        { field: 'name', title: 'Name' },
        { field: 'number', title: 'Number' },
        { field: 'status', title: 'Status' },
        { field: 'amount', title: 'Amount' },
        { field: 'reference', title: 'Reference' },
        { field: 'updatedAt', title: 'Sent Date' },
        { field: 'transfer_code', title: 'Transfer Code' },
    ];



    constructor(
        private userService: UsersService,
        private readonly sharedService: SharedService,
        private pay: PaystackService,
        private dashboardService: DashboardService,
        private localStorage: LocalStorageService
    ) {}

    paymentForm: any = new FormGroup({
        tutors: new FormControl([], this.allSelected ? Validators.required : null),
        payEveryone: new FormControl(false),
        amount: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,5})?$/)]),
        secret: new FormControl('', Validators.required),
        reason: new FormControl('', Validators.required),
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
        this.loadData();
    }

    async loadTransactions() {
        this.pay.getAllTransactions().subscribe((res: any) => {
            this.transactionsHistory = res.data;
        });
    }
    async loadData() {
        this.tutors = await this.userService.getUsers('Tutor');
        this.transactionsHistory = await this.dashboardService.getTransactionHistory();
        this.filterTutors();
        this.loadTransactions();
        this.loggedInUser = await this.userService.getUserAdmin(this.localStorage.get('admin').email);
        this.loggedInUser = this.loggedInUser[0]
        
        
    }

    async  filterBad() {
         this.failedTutorsList = this.tutors.filter(
             (tutor: ITutor) => tutor.phone.length == 0 || tutor.name.length === 0 || findNetwork(tutor.phone) === 'NON'
         );
    }
    async createPaymentRequest() {
        if (!this.loggedInUser) {
            alert("Loading....")
            return
        }
        this.paymentLoading = true
        try {
            if ((this.paymentForm.valid && this.paymentForm.value.secret === this.loggedInUser?.secret) && this.loggedInUser.role ==='master') {
                let tutors = this.paymentForm.value.tutors;
                for (const tutor of tutors) {
                    if (tutor.phone.length > 0 && tutor.name.length > 0) {
                        this.pay.createRecieptRequest(tutor.name, tutor.phone).subscribe((res: TransferRecieptReturnType) =>
                            this.allRecipts.push({
                                amount: this.paymentForm.value.amount * 100,
                                reference: Math.random().toString(20).substring(2),
                                recipient: res.data['recipient_code'],
                                reason:  `FROM ASAP STUDIES : ${this.paymentForm.value.reason}`,
                            })
                        );
                    }
                }

                if (this.allRecipts.length > 0) {
                    console.log(this.allRecipts);
                    this.pay.initaitePaymentInBulk(this.allRecipts).subscribe((res: any) => {
                        this.errorInPayment = !res.status;
                        console.log(res);
                        this.paymentLoading = false
                        this.paymentForm.reset();
                        this.alertModal.open();
                        this.loadTransactions()
                    });
                }
            } else {
                alert('Not authorized to perform this function');

            }
        } catch (err: any) {
            console.log(err.toString());
            this.erroMsg = err.toString();
        } finally {
            // this.alertModal.open();
            this.paymentLoading = false
        }
    }

    async filterTutors() {
        this.filteredTutorsList = this.tutors.filter((tutor: ITutor) => tutor.isComplete === true && tutor.onHold === false && tutor.country === 'Ghana');
        for (let tutor of this.filteredTutorsList) {
            let bank_details = await this.userService.getTutorBankDetails(tutor.id);
            if (bank_details !== null) {
                tutor['phone'] = convertToLocalNumber(bank_details.mobileMOneyNumber);
            }
        }
        this.filteredTutorsList = this.tutors.filter((tutor: ITutor) => tutor.phone.length > 0);
        this.filterBad()
       
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
