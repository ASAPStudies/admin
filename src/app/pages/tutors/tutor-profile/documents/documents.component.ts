import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IStudent } from 'src/app/pages/students/student.interface';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  @Input() student:IStudent | null = null

  constructor(public sanitize:DomSanitizer) { }
  docType:string = '';
  ngOnInit() {
    this.student?.idImageurl.includes('pdf')?this.docType='pdf':'img'
  }

}
