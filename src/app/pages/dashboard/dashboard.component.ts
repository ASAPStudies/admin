import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DashboardService } from 'src/app/service/dashboard.service';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';
import { IStudent } from '../students/student.interface';
import { ModalComponent } from 'angular-custom-modal';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    store: any;

    isLoading: boolean = false;
    totalStudents: number = 0;
    totalTutors: number = 0;
    totalWithdrawRequests: number = 0;

    tab2 = 'students';
    tutors: any;
    selectedTutors: any = [];
    allTutors: any = [];
    allSelected: boolean = false;
    errorInPayment: boolean = false;
    search: any;
    paymentHistory: any;

    cols = [
        { field: 'userId', title: 'User ID' },
        { field: 'full_name', title: 'Full Name' },
        { field: 'email', title: 'Email' },
        { field: 'amount', title: 'Amount' },
        { field: 'time', title: 'Time' },
        { field: 'currency', title: 'Currency' },
    ];

    // Define the payment form
    paymentForm = new FormGroup({
        tutors: new FormControl([], this.allSelected ? Validators.required : null), // Array for selected tutors
        payEveryone: new FormControl(false), // Checkbox for paying everyone
        amount: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,5})?$/)]), // Amount input with validation
    });

    constructor(
        public storeData: Store<any>,
        private dashboardService: DashboardService,
        private sharedService: SharedService,
        private userService: UsersService
    ) {}
    @ViewChild('alertModal') modal!: ModalComponent;

    ngAfterViewInit(): void {}
    ngOnInit(): void {
        this.isLoading = true;
        this.loadData();
    }

    onTutorSelection(event: any) {
        this.selectedTutors = event;
        this.paymentForm.patchValue({ tutors: this.selectedTutors });
    }

    onPayAllChecked(event: any) {
        this.allSelected = event.target.checked;
        if (this.allSelected) {
            this.paymentForm.patchValue({ tutors: this.allTutors });
        } else {
            this.paymentForm.patchValue({ tutors: [] });
        }
    }

    submitForm() {
        if (this.paymentForm.valid) {
            console.log(this.paymentForm.value.tutors);
            try {
                this.dashboardService.payAllUsers(this.paymentForm.value.tutors, this.paymentForm.value.amount);
                this.paymentForm.reset();
                this.loadData();
                this.modal?.open();
            } catch {
                this.errorInPayment = true;
                this.modal?.open();
            } finally {
                this.loadData();
                this.paymentForm.reset();
            }
        }
    }

    async loadData() {
        try {
            this.totalStudents = await this.dashboardService.getUsersTotal('Student');
            this.allTutors = await this.userService.getUsers('Tutor');
            this.totalWithdrawRequests = await this.dashboardService.getRequestsTotal();
            this.paymentHistory = await this.dashboardService.getTransanctionHistory();
            this.totalTutors = this.allTutors.length;
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error('Error loading users:', error);
        }
    }
}
