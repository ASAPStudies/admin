import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';
import { IStudent } from '../students/student.interface';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loading:boolean = false
    email!:string
    password!:string
    constructor(private router:Router, private dashboardservice: DashboardService){

    }
    ngOnInit(){
        const adminData = localStorage.getItem('admin');

        // Check if adminData exists and is valid JSON
        if (adminData) {
            const parsedData = JSON.parse(adminData);
             if (parsedData && parsedData.email) {
                this.router.navigateByUrl("/admin/dashboard")
             }
            
        }
    }
    
    fetchAndVerifyEmail(email:string){
        this.dashboardservice.getAdmin(email).then((res)=> {
            localStorage.setItem('admin', JSON.stringify({'email':res.email, 'role':res.role}))
        }).catch((err)=> {
            alert(err.message)
        })
    }

    signAdminIn(email:string, password:string){
        // localStorage.setItem('admin', email)
        this.loading = true
        if (email.length > 0 && password.length > 0){
          this.dashboardservice
              .getAdmin(email)
              .then((res) => {
                  localStorage.setItem('admin', JSON.stringify({ email: res.email, role: res.role }));
                  this.router.navigateByUrl('/admin/dashboard');

                })
              .catch((err) => {
                  alert(err.message);
              }).finally(()=>{
                this.loading= false
              });
        }
    }

}
