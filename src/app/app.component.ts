 import { Component } from '@angular/core';
import { ToasterService } from './service/toaster.service';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from 'src/configurations/firebase-config';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(private _toast:ToasterService,private router:Router,private authService:AuthService) {
      
    }
    toastConfig: any;
  showToast: boolean = false;

  ngOnInit(): void {



    this._toast.showToast.subscribe((value: any) => {
      console.log(value);

      this.toastConfig = value;
      this.showToast = true;
      if ( this.toastConfig.auto_close == undefined || this.toastConfig.auto_close) {
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    });
  }

  closeToast(event: any) {
    if (event) {
      this.showToast = false;
    }
  }
}
