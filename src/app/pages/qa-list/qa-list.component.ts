import { IStudent } from 'src/app/pages/students/student.interface';
import { Component } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { SharedService } from 'src/app/service/shared.service';
import { title } from 'process';

@Component({
    selector: 'app-qa-list',
    templateUrl: './qa-list.component.html',
    styleUrls: ['./qa-list.component.css'],
})
export class QaListComponent {
    search: string = '';
    students: IStudent[] = [];
    isLoading: boolean = false;
    jsonData = this.students;
    allQuestions: any = [];

    // constructor
    constructor(private userService: UsersService, private router: Router, private localStorage: LocalStorageService, private sharedService: SharedService) {}
    cols = [
        { field: 'email', title: 'Student Email' },
        {field:'studentName', title:'Student Name'},
        { field: 'amount', title: 'Amount' },
        { field: 'dueDate', title: 'Due Date' },
        { field: 'status', title: 'Status' },
        { field: 'createdOn', title: 'Requested Date' },
        { field: 'action', title: 'Action' },
    ];

    ngOnInit() {
        this.loadData()

        
    }
     async loadData() {
        this.isLoading = true;
        
        this.students = await this.userService.getUsers('Student');
        this.allQuestions = await this.sharedService.getAllQuestions();

        // Fetch all tutors

        // Map through withdrawal requests and attach tutor data
        this.allQuestions = this.allQuestions.map((each: any) => ({
            ...each,
            student: this.findUserById(each.studentId),
        }));
        this.isLoading = false
        console.log('q', this.allQuestions)
        // Optionally log data for debugging
        
    }

    // Helper function for finding users by ID
    findUserById(userId: string) {
        return this.students.find((user) => user.id === userId);
    }

   
}
