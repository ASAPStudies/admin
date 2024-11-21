import { SharedService } from 'src/app/service/shared.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-long-term-requests',
    templateUrl: './long-term-requests.component.html',
    styleUrls: ['./long-term-requests.component.css'],
})
export class LongTermRequestsComponent {
    search: string = '';
    students: any[] = [];
    isLoading: boolean = false;
    jsonData = this.students;
    allRequests: any[] = [];
    // constructor 
  
    constructor(
        private userService: UsersService,
        private router: Router,
        private localStorage: LocalStorageService,
        private dashboardService: DashboardService,
        private sharedService: SharedService
    ) {}
    cols = [
        { field: 'email', title: 'Student Email' },
        { field: 'studentName', title: 'Student Name' },
        { field: 'amount', title: 'Amount' },
        { field: 'dueDate', title: 'Due Date' },
        { field: 'status', title: 'Status' },
        { field: 'createdOn', title: 'Requested Date' },
        { field: 'action', title: 'Action' },
    ];

    ngOnInit() {
        this.loadData();
    }
    findUserById(userId: string) {
        return this.students.find((user) => user.id === userId);
    }
    async loadData() {
        this.loadRequests();
    }
    async loadRequests() {
        this.allRequests = await this.dashboardService.retrieveAllLiveRequests();
        this.isLoading = true;

        this.students = await this.userService.getUsers('Student');

        // Fetch all tutors

        // Map through withdrawal requests and attach tutor data
        this.allRequests = this.allRequests.map((each: any) => ({
            ...each,
            student: this.findUserById(each.studentId),
        }));
        this.isLoading = false;
    }
}
