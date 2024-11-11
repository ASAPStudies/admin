import { DashboardService } from 'src/app/service/dashboard.service';
import { DatePipe, NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { IQuestion } from '../../students/question.interface';
import { SharedService } from 'src/app/service/shared.service';
import { IStudent } from '../../students/student.interface';
import { UsersService } from 'src/app/service/users.service';
import { QuestionDetailCompoent } from '../../qa-list/qa-detail/question-detail/question-detail.component';
import { LiveDetailComponent } from "../live-component-detail/live.component";
import { SessionIconComponent } from 'src/app/components/session.icon';

@Component({
    standalone: true,
    selector: 'app-live-requests',
    templateUrl: './live-requests-detail.html',
    imports: [
    NgClass,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    SharedModule,
    QuestionDetailCompoent,
    LiveDetailComponent,
    SessionIconComponent,
    DatePipe

],
})
export class LiveRequestDetailPage {
    constructor(
        private readonly activeRoute: ActivatedRoute,
        private router: Router,
        private userService: UsersService,
        private sharedService: SharedService,
        private dashboardService:DashboardService
    ) {}
    currentId: string | null = '';
    currentUserId: string | null = '';
    isLoading: boolean = false;
    activeTab = 'home';
    current_student: any;
    subject: any;
    tutorObj: any;
    currrentSession:any;
    session = {id:1, name:"james"}
    ngOnInit(): void {
        this.currentId = this.activeRoute.snapshot.paramMap.get('id');
        this.currentUserId = this.activeRoute.snapshot.paramMap.get('userId');
        
        if (!this.currentId || !this.currentUserId) {
            this.router.navigateByUrl('/dashboard');
        }
        this.loadData();
    }

    async loadData() {
        this.current_student = await this.userService.getUserByUID(this.currentUserId as string)
    }

    toggleTab(name: string) {
        this.activeTab = name;
    }
}
