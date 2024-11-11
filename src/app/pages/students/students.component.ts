import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent {


  constructor(private activeRoute: ActivatedRoute){}
}
