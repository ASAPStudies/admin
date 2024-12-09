import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { firebaseDb } from 'src/configurations/firebase-config';
import { ToasterService } from '../service/toaster.service';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AuthService } from '../service/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: './cover-login.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class CoverLoginComponent {
    form_submission: boolean = false;
    loading: boolean = false;
    currYear: number = new Date().getFullYear();
    form = { email: '', password: '' };
    store:any
    constructor(  public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService,
        private authService: AuthService,
        private _toaster: ToasterService) {

        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }



    async onLogin(value: any) {
        this.loading = true;
        console.log(value);
        try {
            const { user } = await this.authService.signIn(value.email, value.password);
            console.log(user);
            if (!(await this.authService.checkUserIsAdmin(user.email as string))) {
                await this.authService.signOut();
                this._toaster.showHideToast({ type: 'error', title: 'Invalid Credentials' });
                this.loading = false;
                return;
            }
            this._toaster.showHideToast({ type: 'success', title: 'Login successful' });
            this.router.navigate(['/dashboard']);
        } catch (error:any) {
            this.loading = false;
            console.log(error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                this._toaster.showHideToast({ type: 'error', title: 'Invalid email or password' });
            } else {
                this._toaster.showHideToast({ type: 'error', title: 'An error occurred' });
            }
        }
    }
    
}
