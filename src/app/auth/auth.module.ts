import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { CoverLoginComponent } from './cover-login';
import { CoverPasswordResetComponent } from './cover-password-reset';

// headlessui
import { MenuModule } from 'headlessui-angular';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'ASAP Admin | Login' },
    {
        path: 'password-reset',
        component: CoverPasswordResetComponent,
        title: 'ASAP Admin | Password Reset',
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, MenuModule, IconModule,SharedModule],
    declarations: [
        CoverLoginComponent,
        CoverPasswordResetComponent,
        LoginComponent,
    ],
})
export class AuthModule {}
