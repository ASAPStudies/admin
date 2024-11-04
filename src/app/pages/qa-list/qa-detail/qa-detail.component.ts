import { QuestionDetailCompoent } from './question-detail/question-detail.component';
import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { IQuestion } from '../../students/question.interface';
import { SharedService } from 'src/app/service/shared.service';
import { IStudent } from '../../students/student.interface';
import { UsersService } from 'src/app/service/users.service';

@Component({
    selector: 'qa-detail',
    standalone: true,
    templateUrl: './qa-detail.component.html',
    styleUrls: ['./qa-detail.component.css'],
    imports: [NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault, SharedModule, QuestionDetailCompoent],
})
export class QADetailCompoentPage implements OnInit {
    constructor(private readonly activeRoute: ActivatedRoute, private router: Router, private userService : UsersService, private sharedService:SharedService) {}
    currentId: string | null = '';
    currentUserId: string | null = '';
    isLoading: boolean = false;
    activeTab = 'home';
    current_student:any;
    currentQuestion:any;
    subjects:any;
    questions:any
    ngOnInit(): void {
        this.currentId = this.activeRoute.snapshot.paramMap.get('id');
        this.currentUserId = this.activeRoute.snapshot.paramMap.get('userId');
        this.loadData()
        
        if (!this.currentId || !this.currentUserId) {
            this.router.navigateByUrl('/admin/qa-requests');
        }
    }
    
    async loadData(){
        this.current_student = await this.userService.getUserByUID(this.currentUserId as string)
        this.currentQuestion = await this.sharedService.getQuestionByID(this.currentId as string)
        console.log(this.current_student)
        console.log(this.currentQuestion)

    }

    

    toggleTab(name: string) {
        this.activeTab = name;
    }
}
