import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
    selector: 'app-withdraw-requests',
    templateUrl: './withdraw-requests.component.html',
    styleUrls: ['./withdraw-requests.component.css'],
})
export class WithdrawRequestsComponent implements OnInit {
    allTutors: any[] = [];

    withdrawRequests: any[] = [];
    isLoading: boolean = false;
    search: string = '';

    // constructor
    constructor(private userService: UsersService, private router: Router, private localStorage: LocalStorageService, private sharedService: SharedService) {}
    cols = [
        { field: 'tutor', title: 'Requested Tutor' },
        { field: 'amount', title: 'Amount' },
        { field: 'method', title: 'Method' },
        { field: 'status', title: 'Status' },
        { field: 'createdOn', title: 'Requested Date' },
        { field: 'action', title: 'Action' },
    ];

    ngOnInit() {
        this.loadData()
    }

    async loadData() {
        this.isLoading = true;

        this.allTutors = await this.userService.getUsers('Tutor');
        this.withdrawRequests = await this.sharedService.getAllWithdrawalRequests();

        // Fetch all tutors

        // Map through withdrawal requests and attach tutor data
        this.withdrawRequests = this.withdrawRequests.map((each) => ({
            ...each,
            tutor: this.findUserById(each.requested_by),
        }));
        this.isLoading = false;

        // Optionally log data for debugging
    }
    findUserById(userId: string) {
        return this.allTutors.find((user) => user.id === userId);
    }

    changeAccountStatus(status: boolean, userId: string) {
        this.userService.updateAccountStatus(status, userId);
    }

    selectedRow(value: any) {
        this.localStorage.set('request', value);
        this.router.navigate(['/withdraw-requests/' + value.id]);
    }

    async getWithdrawRequest() {
        try {
            this.isLoading = true;
            let requests = await this.sharedService.getWithdrawRequestWithStatus('Pending');
            for (let index = 0; index < requests.length; index++) {
                const element = requests[index];
                element['tutor'] = await this.userService.getUserByUID(element.requested_by);
            }
            this.withdrawRequests = requests;
            console.log(requests);

            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error('Error loading users:', error);
        }
    }
}
