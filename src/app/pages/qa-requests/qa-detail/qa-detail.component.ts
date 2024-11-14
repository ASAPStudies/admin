import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
    selector: 'app-qa-detail',
    templateUrl: './qa-detail.component.html',
    styleUrls: ['./qa-detail.component.css'],
})
export class QaDetailComponent implements OnInit {
    currentId: string | null = '';
    currentUserId: string | null = '';
    isLoading: boolean = true; // Start with loading state
    activeTab = 'home';
    current_student: any;
    currentQuestion: any;
    subject: any;
    question: any;
    tutorObj: any;
    errorMessage: string | null = null; // To store error messages

    constructor(private router: Router, private activeRoute: ActivatedRoute, private userService: UsersService, private sharedService: SharedService) {}

    goBack() {
        this.router.navigateByUrl('/qa-requests');
    }

    ngOnInit(): void {
        this.currentId = this.activeRoute.snapshot.paramMap.get('id');

        if (!this.currentId) {
            this.router.navigateByUrl('/qa-requests');
        } else {
            this.loadData();
        }
    }

    async loadData() {
        try {
            this.isLoading = true; // Set loading to true before fetching data
            this.question = await this.sharedService.getQuestionByID(this.currentId as string);
            this.subject = await this.sharedService.getSubjectByID(this.question.subject as string);
            if (!this.question) {
                this.errorMessage = 'Question not found.';
            }
        } catch (error) {
            console.error('Error fetching question:', error);
            this.errorMessage = 'An error occurred while fetching the question.';
        } finally {
            this.isLoading = false; 
        }
    }
    viewTutor() {

        if (this.question && this.question.answeredBy) {

            this.router.navigateByUrl('/dashboard/tutors/' + this.question.answeyBy);
        } else {
            console.error('Question or answeredBy is not defined');
        }
    }
}
