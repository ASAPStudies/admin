import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { UsersService } from 'src/app/service/users.service';
import { IStudent, ITutor } from '../../students/student.interface';
import { SharedService } from 'src/app/service/shared.service';

@Component({
    selector: 'app-tutor-list',
    templateUrl: './tutor-list.component.html',
})
export class TutorListComponent implements OnInit {
    // Variables
    allSujects: any = [];
    tutors: ITutor[] = [];
    isLoading: boolean = false;
    search: string = '';
    jsonData = this.tutors;
    filteredTutors!: ITutor[];
    // constructor
    constructor(private userService: UsersService, 
        private router: Router, 
        private localStorage: LocalStorageService,
        private sharedService: SharedService
    ) {
       
    }
    cols = [
        { field: 'name', title: 'Student Name' },
        { field: 'email', title: 'Email' },
        { field: 'dateofbirth', title: 'Date of Birth' },
        { field: 'gender', title: 'Gender' },
        { field: 'country', title: 'Country' },
        { field: 'onHold', title: 'Account Status' },
        { field: 'action', title: 'Action' },
    ];

    ngOnInit() {
         this.loadUsers();
         this.loadSubjects()

    }

    async loadSubjects(){
        this.allSujects = await this.sharedService.getAllSubjects();
    }


    filterTutors(event:any) {
        if (event.target.value === 'all') {
            this.filteredTutors = this.tutors
            return
        }
        this.filteredTutors = this.filteredTutors.filter((each:ITutor)=>  each.subjects?.includes(event.target.value))
    }

    // fetch students
    async loadUsers() {
        try {
            this.isLoading = true;
            this.tutors = await this.userService.getUsers('Tutor');

            this.tutors = this.tutors.filter((res) => res.onHold == false);
            console.log('Tutors are', this.tutors);
            /// Make json for Excel
            this.jsonData = this.tutors.map((obj: any) => {
                const newObj: any = {};
                this.cols.forEach((col) => {
                    newObj[col.field] = obj[col.field];
                });
                return newObj;
            });
            this.filteredTutors = this.tutors
            this.isLoading = false;

        } catch (error) {
            this.isLoading = false;
            console.error('Error loading users:', error);
        }
    }

    changeAccountStatus(status: boolean, userId: string) {
        this.userService.updateAccountStatus(status, userId);
    }

    selectedRow(value: IStudent) {
        this.localStorage.set('tutor', value);
        this.router.navigate(['/tutors/' + value.id]);
    }

    exportTable(type: string) {
        let columns: any = this.cols.map((d: { field: any }) => {
            return d.field;
        });

        let records = this.tutors;
        let filename = 'Tutors';

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

    excelColumns() {
        return {
            Id: 'id',
            Name: 'name',
            Email: 'email',
            DOB: 'dateofbirth',
            country: 'country',
            Gender: 'gender',
        };
    }

    excelItems() {
        return this.tutors;
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
