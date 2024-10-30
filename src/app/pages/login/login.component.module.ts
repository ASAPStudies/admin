import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: LoginComponent, title: 'ASAP Admin | Login' }];

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule, // Ensure FormsModule is imported
        RouterModule.forChild(routes),
    ],
})
export class LoginModule {}
