import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';
import { IStudent } from '../students/student.interface';
import { DashboardService } from 'src/app/service/dashboard.service';
import { NgIf } from '@angular/common';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { LoadingSpinner } from "../../elements/loading-spinner";

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, ReactiveFormsModule, NgIf, LoadingSpinner]
})
export class LoginComponent implements OnInit {
    loading:boolean = false
    email!:string
    password!:string
    constructor(private router:Router, 
        private dashboardservice: DashboardService,
        private localStore:LocalStorageService
        ){
    }

    loginForm = new  FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
    })
    ngOnInit(){
        const adminData = this.localStore.get('admin');
        // Check if adminData exists and is valid JSON
        if(adminData.email != null) {
            this.router.navigateByUrl("/dashboard")
        }
    }
    
   
    submit(){
        if (this.loginForm.invalid){
          alert("Invalid Logins")
          return
        }
        this.signAdminIn(this.loginForm.value.email, this.loginForm.value.password)
    }

    signAdminIn(email:any, password:any){
        // localStorage.setItem('admin', email)
        this.loading = true
        if (email.length > 0 && password.length > 0){
          this.dashboardservice
              .getAdmin(email)
              .then((res) => {
                this.localStore.set('admin',{ email: res.email, role: res.role } )
                  this.router.navigateByUrl('/dashboard');

                })
              .catch((err) => {
                  alert(err.message);
              }).finally(()=>{
                this.loading= false
              });
        }
    }

}
