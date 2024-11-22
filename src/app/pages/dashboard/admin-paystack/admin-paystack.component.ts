import { SharedService } from 'src/app/service/shared.service';
import { Component, ViewChild, AfterViewInit, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'angular-custom-modal';
import { ITutor } from '../../students/student.interface';
import { UsersService } from 'src/app/service/users.service';
import { PaystackService } from 'src/app/service/paystack.service';
import { TransferRecieptReturnType, TransferResponse } from './paystact.interface';
import { createReadyReceipts } from './paystact.helper';
import { DashboardService } from 'src/app/service/dashboard.service';

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
        private dashboardService: DashboardService
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
    }

    async createPaymentRequest() {
        try {
        if (this.paymentForm.valid && this.paymentForm.value.secret === 'hhh') {
            let tutors = this.paymentForm.value.tutors;
            for (const tutor of tutors) {
                this.pay.createRecieptRequest(tutors[0].name, tutors[0].phone).subscribe((res: TransferRecieptReturnType) =>
                    this.allRecipts.push({
                        amount: this.paymentForm.value.amount * 100,
                        reference: Math.random().toString(20).substring(2),
                        recipient: res.data['recipient_code'],
                        reason: this.paymentForm.value.reason,
                    })
                );
            }

            if (this.allRecipts.length > 0) {
                this.pay.initaitePaymentInBulk(this.allRecipts).subscribe((res: any) => {
                    this.errorInPayment = !res.status;
                    console.log(res)
                    this.paymentForm.reset();
                });
                this.alertModal.open();
            }
        } else {
            alert('Invalid Information Provided');
        }
        } catch (err) {
            console.log(err);
        } finally {
        }
    }

    async filterTutors() {
        this.filteredTutorsList = this.tutors.filter((tutor: ITutor) => tutor.isComplete === true && tutor.onHold === false && tutor.country === 'Ghana');
        for (let tutor of this.filteredTutorsList) {
            let bank_details = await this.userService.getTutorBankDetails(tutor.id);
            if (bank_details !== null) {
                tutor['phone'] = bank_details.mobileMOneyNumber;
            }
        }
        this.filteredTutorsList = this.tutors.filter((tutor: ITutor) => tutor.phone.length > 0);
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
