import { IStudent } from 'src/app/pages/students/student.interface';
import { Component } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { SharedService } from 'src/app/service/shared.service';
import { title } from 'process';

@Component({
    selector: 'app-qa-list',
    templateUrl: './qa-list.component.html',
    styleUrls: ['./qa-list.component.css'],
})
export class QaListComponent {
    search: string = '';
    students: IStudent[] = [];
    isLoading: boolean = false;
    jsonData = this.students;
    allQuestions: any = [];

    // constructor
    constructor(private userService: UsersService, private router: Router, private localStorage: LocalStorageService, private sharedService: SharedService) {}
    cols = [
        { field: 'tutor', title: 'Student Email' },
        {field:'studentName', title:'Student Name'},
        { field: 'amount', title: 'Amount' },
        { field: 'dueDate', title: 'Due Date' },
        { field: 'status', title: 'Status' },
        { field: 'createdOn', title: 'Requested Date' },
        { field: 'action', title: 'Action' },
    ];

    ngOnInit() {
        this.loadUsers();
        this.loadQuestions();
    }

    async loadQuestions() {
        this.allQuestions = await this.sharedService.getAllQuestions();
        console.log(this.allQuestions);
    }

    // fetch students
    async loadUsers() {
        try {
            this.isLoading = true;
            this.students = await this.userService.getUsers('Student');
            /// Make json for Excel
            this.jsonData = this.students.map((obj: any) => {
                const newObj: any = {};
                this.cols.forEach((col) => {
                    newObj[col.field] = obj[col.field];
                });
                return newObj;
            });
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error('Error loading users:', error);
        }
    }

    selectedRow(value: IStudent) {
        this.localStorage.set('student', value);
        this.router.navigate(['/admin/students/' + value.id]);
    }

    exportTable(type: string) {
        let columns: any = this.cols.map((d: { field: any }) => {
            return d.field;
        });

        let records = this.students;
        let filename = 'students';

        let newVariable: any;
        newVariable = window.navigator;

        if (type == 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return this.capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: { [x: string]: any }) => {
                columns.map((d: any, index: number) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type == 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            columns.map((d: any) => {
                rowhtml += '<th>' + this.capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            records.map((item: { [x: string]: any }) => {
                rowhtml += '<tr>';
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
            // winPrint.close();
        } else if (type == 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return this.capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: { [x: string]: any }) => {
                columns.map((d: any, index: number) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.txt');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.txt');
                }
            }
        }
    }

    capitalize(text: string) {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }
}
