import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../students/student.interface';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-pending-review-tutors-list',
  templateUrl: './pending-review-tutors-list.component.html',
  styleUrls: ['./pending-review-tutors-list.component.css']
})
export class PendingReviewTutorsListComponent implements OnInit {



    // Variables
    tutors:IStudent[]=[]
    isLoading:boolean = false;
    search:string = '';
    jsonData = this.tutors;


    // constructor
    constructor(private userService:UsersService, private router:Router,private localStorage:LocalStorageService) {
        this.loadUsers();
    }
    cols = [
        { field: 'name', title: 'Student Name' },
        { field: 'email', title: 'Email' },
        { field: 'dateofbirth', title: 'Date of Birth' },
        { field: 'gender', title: 'Gender' },
        { field: 'country', title: 'Country' },
        { field: 'onHold', title: 'Account Status' },
        {field:'action',title:'Action'}
    ];


    ngOnInit() {

    }

    // fetch students
    async loadUsers() {
        try {
            this.isLoading = true;
            this.tutors = await this.userService.getUsers('Tutor');
//             this.tutors = [
//     {
//         "id": "4ZCYXa64oJSFUIYfkQqS4FA7FKw1",
//         "isComplete": false,
//         "imageUrl": "",
//         "balance": 0,
//         "email": "qw8fqmdzk6@privaterelay.appleid.com",
//         "idNumber": "",
//         "createdOn": {
//             "seconds": 1715341175,
//             "nanoseconds": 260841000
//         },
//         "subjects": [],
//         "onHold": true,
//         "country": "",
//         "dateofbirth": {
//             "seconds": 1715341175,
//             "nanoseconds": 260841000
//         },
//         "nationalID": "",
//         "gender": "Unknown",
//         "name": "",
//         "fcmToken": "cysK2WRhxE0erCzes0A-CF:APA91bGhh3PYoOKaUBR1LcO3wWEj0pWh3nYWkBXNWiGix1m1f9J-LwZLA5e2RITVvExEb3qmot7K8XNxtO7M-sVdIMa64YMzV1Ele_fz66Vc8OHYEyfO0o4noFM2NFHzF2pXB1v3BIPN",
//         "provider": "Apple",
//         "updatedOn": {
//             "seconds": 1715341175,
//             "nanoseconds": 260842000
//         },
//         "idImageurl": "",
//         "phone": "",
//         "role": "Tutor",
//         "status": true
//     },
//     {
//         "id": "AhiXYI97DiQNtib8dJNoyHObh5i1",
//         "email": "arsaln8t8@gmail.com",
//         "idNumber": "½¾€¼ʻ",
//         "dateofbirth": {
//             "seconds": 1711911600,
//             "nanoseconds": 0
//         },
//         "balance": 141,
//         "updatedOn": {
//             "seconds": 1714448775,
//             "nanoseconds": 602819000
//         },
//         "nationalID": "National ID",
//         "createdOn": {
//             "seconds": 1712433868,
//             "nanoseconds": 952213000
//         },
//         "country": "Aruba",
//         "gender": "Female",
//         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FAhiXYI97DiQNtib8dJNoyHObh5i1?alt=media&token=946e47aa-ebe4-4744-a0f5-c77055d60c2e",
//         "name": "¡²³¼€¤ tyu",
//         "role": "Tutor",
//         "provider": "Email",
//         "isComplete": true,
//         "subjects": [
//             "QvPGR5A39zmICHrypkd0",
//             "z2bO2FlmEMCDGkPUrdCw",
//             "fkNVZS7K5sU7s7GW2Yc2",
//             "Skeo6s5235k0nOU6Uthp"
//         ],
//         "fcmToken": "eD6rNuSiTnq5uORULR6zpM:APA91bHS7PRBfyXjfK_Alh5u1Jo22yih5nb7T5KSRXBUem_2FoOzodF_1i5w3yufVZSWX7eRcsbSnznbLE3tbt_jmaqvLa1pWzWLD4H2CWa8_QCqrYYNR9lICt4-P7JBHoPAQ3tp7A24",
//         "phone": "",
//         "onHold": false,
//         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2FIMG-20240429-WA0037.jpg?alt=media&token=641bf623-5522-4e1f-afb8-1462f70dec30",
//         "status": true
//     },
//     {
//         "id": "lqltyclDl7cuCRbYeI7l5v6vwz42",
//         "email": "htariq006@gmail.com",
//         "balance": 0,
//         "subjects": [
//             "Skeo6s5235k0nOU6Uthp"
//         ],
//         "status": true,
//         "updatedOn": {
//             "seconds": 1713463841,
//             "nanoseconds": 269522000
//         },
//         "phone": "",
//         "provider": "Email",
//         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FlqltyclDl7cuCRbYeI7l5v6vwz42?alt=media&token=12896dbd-f85c-44ee-adec-be7e8c04f4bc",
//         "gender": "Male",
//         "idNumber": "123456789",
//         "role": "Tutor",
//         "name": "Hamza Tariq",
//         "isComplete": true,
//         "fcmToken": "eT2Oa-NsQqGRqFvtyNonNY:APA91bGF7LX9Z6XlUXS6aQsvGNxrvjNUqWz2MO0goZpALXK70S8uYmXNrsFVTcnYOCcAHfnhFSybGqwAwhCPK7K49D3LKjfCSp5z5HIDsGlxghhsFx2J4ye6kYpo1U_XPP8tZ3K2aQZy",
//         "country": "France",
//         "onHold": false,
//         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2Fdummy.pdf?alt=media&token=bd52a1bf-2984-4213-88cd-ded7203d8697",
//         "nationalID": "National ID",
//         "createdOn": {
//             "seconds": 1713463445,
//             "nanoseconds": 800972000
//         },
//         "dateofbirth": {
//             "seconds": 1713380400,
//             "nanoseconds": 0
//         }
//     },
//     {
//         "id": "nBWUpGSgkzLa9IW4nCumkBwCum13",
//         "createdOn": {
//             "seconds": 1713794583,
//             "nanoseconds": 650187000
//         },
//         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FnBWUpGSgkzLa9IW4nCumkBwCum13?alt=media&token=ea45a4b0-18cd-4a82-9a13-4b0506535c50",
//         "fcmToken": "coJUdUDCg00grOxPIFAKmh:APA91bHGJrwizoFQy4XqSLkyLnnvZIAcx3wmtCH5Vo_8HvK23wXX1yvzS0opyooY0xdkJMFY__C5CczG-IwYLlYgS5jcqsk630Qix-iSR8Xb_Hb9cNZqrkodiQUwi8MaSKSsjWW1gKVp",
//         "gender": "Male",
//         "name": "Solomon Essumang ",
//         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2FBlue%20Minimalist%20Online%20Course.%20Course%20Template.%20Instagram%20Story..pdf?alt=media&token=cab6aba0-e0e6-40d3-880f-1ebc01a299ea",
//         "updatedOn": {
//             "seconds": 1714471597,
//             "nanoseconds": 986037000
//         },
//         "email": "essumangsolomon@gmail.com",
//         "idNumber": "81098189038",
//         "provider": "Email",
//         "role": "Tutor",
//         "subjects": [
//             "z2bO2FlmEMCDGkPUrdCw",
//             "Skeo6s5235k0nOU6Uthp",
//             "x8x6ioZ0y3tlGVRkJDSz",
//             "GWFW14ezjgoDhEzNh1lb"
//         ],
//         "dateofbirth": {
//             "seconds": 735278400,
//             "nanoseconds": 0
//         },
//         "phone": "",
//         "onHold": false,
//         "status": true,
//         "balance": 9,
//         "country": "United States",
//         "nationalID": "National ID",
//         "isComplete": true
//     },
//     {
//         "id": "r45Ixw3s5jeK3YSVMCtU1FVCbTv1",
//         "role": "Tutor",
//         "status": true,
//         "idNumber": "",
//         "dateofbirth": {
//             "seconds": 1715416845,
//             "nanoseconds": 601529000
//         },
//         "imageUrl": "",
//         "provider": "Apple",
//         "balance": 0,
//         "subjects": [],
//         "createdOn": {
//             "seconds": 1715416845,
//             "nanoseconds": 601528000
//         },
//         "email": "d7fzn4dcw6@privaterelay.appleid.com",
//         "phone": "",
//         "name": "",
//         "nationalID": "",
//         "gender": "Unknown",
//         "onHold": true,
//         "isComplete": false,
//         "fcmToken": "dwoCXcamkEecjJmXlIydB9:APA91bEquhIe5pyDj_3-gPahDHHX01PP-NGGr9sZ9_PSSeurLekptfNeBm34tRfboIp0dO1Qt2heSEEhGE6nO7aI2Do8HzGa9dyK0ebiuiXSopQfcJJGdn6zQUGLkkhbTaflM00M85Dc",
//         "country": "",
//         "idImageurl": "",
//         "updatedOn": {
//             "seconds": 1715416845,
//             "nanoseconds": 601529000
//         }
//     },
//     {
//         "id": "zTj52HPLAdUmxfFkXE0Fe0FNoMi2",
//         "provider": "Google",
//         "gender": "Male",
//         "createdOn": {
//             "seconds": 1713944227,
//             "nanoseconds": 878068000
//         },
//         "idNumber": "426273838393",
//         "name": "Naeem Tutor",
//         "email": "developer.cs001@gmail.com",
//         "onHold": false,
//         "isComplete": true,
//         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FzTj52HPLAdUmxfFkXE0Fe0FNoMi2?alt=media&token=01cf5ae9-4f61-43b9-b873-1486d7192ff8",
//         "role": "Tutor",
//         "nationalID": "National ID",
//         "balance": 2,
//         "fcmToken": "c8QbbzcUQtCUY-_g5kJmfc:APA91bFiPzSXiWjXZx4_IWpGwZdbcthGIS4T3M-2oZUz4GCmGTMX0nD9Km-aC_gu4rPr3jSFx2N2BV17pZ1M0sn6SeC7cUWlBz_deMCS3GBLAwGYxxuMYk4WXYeNk68M4im4MZOy7NA-",
//         "status": true,
//         "country": "Pakistan",
//         "phone": "",
//         "subjects": [
//             "QB0NCgQqsLoxRoLmWfQm",
//             "QrHuGYvHS2PB9wKHJxMd"
//         ],
//         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2F3bytelabs%20Retainer.pdf?alt=media&token=af4cc71f-a020-45f2-b208-c8db19d7b0ec",
//         "updatedOn": {
//             "seconds": 1713944432,
//             "nanoseconds": 840046000
//         },
//         "dateofbirth": {
//             "seconds": 1713898800,
//             "nanoseconds": 0
//         }
//     }
// ]
            this.tutors =  this.tutors.filter(res=> res.onHold == true)
            console.log("Tutors are",this.tutors);
            /// Make json for Excel
            this.jsonData = this.tutors.map((obj: any) => {
                const newObj: any = {};
                this.cols.forEach((col) => {
                    newObj[col.field] = obj[col.field];
                });
                return newObj;
            });
            this.isLoading=false;
        } catch (error) {
            this.isLoading=false;
            console.error('Error loading users:', error);
        }
      }

      changeAccountStatus(status:boolean,userId:string){
        this.userService.updateAccountStatus(status,userId)
    }

      selectedRow(value:IStudent){
        this.localStorage.set('tutor',value)
        this.router.navigate(['/tutors/'+value.id])
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
            Gender:'gender'
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
nInit() {
  }

}
