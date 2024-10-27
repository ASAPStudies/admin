import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentProfileComponent } from './student-profile/student-profile.component';


const routes: Routes = [
    { path: '', component: StudentListComponent, title: 'ASAP Admin | Students' },
    { path: ':uid', component: StudentProfileComponent, title: 'ASAP Admin | Student Profile' },

];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StudentListComponent,StudentsComponent,StudentProfileComponent],
  exports:[SharedModule]
})
export class StudentsModule { }
