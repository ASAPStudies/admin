import { Component } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-qa-requests',
  templateUrl: './qa-requests.component.html',
  styleUrls: ['./qa-requests.component.css']
})
export class QaRequestsComponent {
 search: string = '';
    students: any = [];
    isLoading: boolean = false;
    jsonData = this.students;
    allQuestions: any = [];

    // constructor
    constructor(private userService: UsersService,  private sharedService: SharedService) {}
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
        // Optionally log data for debugging
                console.log(this.allQuestions)

        
    }

    // Helper function for finding users by ID
    findUserById(userId: string) {
        return this.students.find((user:any) => user.id === userId);
    }

  

}
