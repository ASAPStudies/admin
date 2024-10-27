import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-payment-requests',
  templateUrl: './payment-requests.component.html',
  styleUrls: ['./payment-requests.component.css']
})
export class PaymentRequestsComponent {

    @Input() withdrawRequests:any[]=[];
    isLoading:boolean = false;
    search:string = '';


    // constructor
    constructor(private userService:UsersService, private router:Router,private localStorage:LocalStorageService,private sharedService:SharedService) {
    }
    cols = [
        { field: 'tutor', title: 'Requested Tutor' },
        { field: 'amount', title: 'Amount' },
        { field: 'method', title: 'Method' },
        { field: 'status', title: 'Status' },
        { field: 'createdOn', title: 'Requested Date' },
        {field:'action',title:'Action'}
    ];


    ngOnInit() {
        
    }

    selectedRow(value:any){
        this.localStorage.set('request',value)
        this.router.navigate(['/withdraw-requests/'+value.id])
    }

}
