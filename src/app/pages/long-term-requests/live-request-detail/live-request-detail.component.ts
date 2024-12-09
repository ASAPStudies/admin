import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/service/dashboard.service';
import { SharedService } from 'src/app/service/shared.service'


@Component({
    selector: 'app-live-request-detail',
    templateUrl: './live-request-detail.component.html',
    styleUrls: ['./live-request-detail.component.css'],
})
export class LiveRequestDetailComponent {
    session!: any;
    currentSessionId!: string | null;
    currentSubject!: any;
    isLoading:boolean = false;
    constructor(private dashboardService: DashboardService, private sharedService: SharedService, private activeRoute: ActivatedRoute) {}
    ngOnInit() {
        this.currentSessionId = this.activeRoute.snapshot.paramMap.get('id');
        this.loadData();
    }
    async loadData() {
        try {
          this.isLoading = true
          this.session = await this.sharedService.getSessionByID(this.currentSessionId as string);
          this.currentSubject = await this.sharedService.getSubjectByID(this.session?.subject as string);
      } catch {

      }finally {
        this.isLoading= false
      }

        }
}
