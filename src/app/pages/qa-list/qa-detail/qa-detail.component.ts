import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { IQuestion } from "../../students/question.interface";

@Component({
    selector:'qa-detail',
    standalone:true,
    templateUrl:'./qa-detail.component.html',
    styleUrls:['./qa-detail.component.css'],
    imports:[NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault, SharedModule]
})
export class QADetailCompoentPage implements OnInit {

    constructor(private readonly activeRoute: ActivatedRoute, private router:Router){}
    currentId:string|null = ""
    currentUserId:string|null = ""
    isLoading:boolean = false
    activeTab = "home"
    ngOnInit(): void {
        this.currentId = this.activeRoute.snapshot.paramMap.get('id');
        this.currentUserId = this.activeRoute.snapshot.paramMap.get('userId');

        if (!this.currentId || !this.currentUserId){
            this.router.navigateByUrl('/admin/qa-requests')
        }
    }

    toggleTab(name:string) {
        this.activeTab = name
    }

}
