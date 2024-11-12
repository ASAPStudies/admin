import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth:AuthService){}

  formData = new FormGroup({
    email : new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  })

  submit(){

    this.auth.logUserIn(this.formData.value)
    }
}
