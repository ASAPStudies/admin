import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { UsersService } from 'src/app/service/users.service';
import { IStudent } from '../../students/student.interface';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
})
export class TutorListComponent implements OnInit {


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
            // this.tutors = [
            //     {
            //         "id": "2sphqxroW1YeOYH5zq7GIxm0MOs1",
            //         "phone": "",
            //         "updatedOn": {
            //             "seconds": 1715772086,
            //             "nanoseconds": 630590000
            //         },
            //         "provider": "Email",
            //         "dateofbirth": {
            //             "seconds": 832118400,
            //             "nanoseconds": 0
            //         },
            //         "email": "pandalakatolino649@gmail.com",
            //         "name": "Emmanuel Donkoh Anderson ",
            //         "status": true,
            //         "nationalID": "National ID",
            //         "gender": "Male",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2F2sphqxroW1YeOYH5zq7GIxm0MOs1?alt=media&token=d94a8588-2e49-40e3-9e8f-98be38831d2e",
            //         "createdOn": {
            //             "seconds": 1715771797,
            //             "nanoseconds": 455007000
            //         },
            //         "subjects": [
            //             "QvPGR5A39zmICHrypkd0",
            //             "Skeo6s5235k0nOU6Uthp",
            //             "UnJuHln4NSlaY3F5rLzK",
            //             "XMkheXj2veBRuhl4l2GE",
            //             "QB0NCgQqsLoxRoLmWfQm",
            //             "jEFdoZD5FNWE8I13eAwj",
            //             "GTOe5fdF8XRVxfT5vbcm",
            //             "QrHuGYvHS2PB9wKHJxMd",
            //             "L34q85IWhwWqxPI4PpKr",
            //             "vmRMwcMpVK96IgHpjlhT",
            //             "5gQgMxVEbF649Ksb4XMY",
            //             "VzYxaIXc3r82z6dx1Kjx",
            //             "yCON1lyHOEeYUQNCJVJq",
            //             "P0NCRT82WZPQUOiIBQwp",
            //             "rNFBbx5zp6fM0q81ZseO"
            //         ],
            //         "country": "Ghana",
            //         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2FIMG_20240217023639263.jpg?alt=media&token=16ea57d3-d0b2-4a32-ae6e-797bc707e001",
            //         "role": "Tutor",
            //         "onHold": false,
            //         "fcmToken": "cwHk0VfoRB6kvIQJCIl8nT:APA91bEgMTsA3rvGP313KtIJix_EnrnUpQvKGTYf6i3U8w8WOPmJ3Yp8DiDKviI90v8GqEzWohFFlYiIfzSHi1V4IFSyp2LdtKRJYd6Q5OAiS0MsqpSmI9au3CfFQ-gDiNTfgdM91faI",
            //         "idNumber": "GHA-727599137-6",
            //         "balance": 0,
            //         "isComplete": true
            //     },
            //     {
            //         "id": "AhiXYI97DiQNtib8dJNoyHObh5i1",
            //         "phone": "",
            //         "gender": "Female",
            //         "email": "arsaln8t8@gmail.com",
            //         "onHold": false,
            //         "isComplete": true,
            //         "nationalID": "National ID",
            //         "createdOn": {
            //             "seconds": 1712433868,
            //             "nanoseconds": 952213000
            //         },
            //         "subjects": [
            //             "oRPinOZIlVSmZl94YcKB"
            //         ],
            //         "role": "Tutor",
            //         "dateofbirth": {
            //             "seconds": 1711911600,
            //             "nanoseconds": 0
            //         },
            //         "balance": 141,
            //         "status": true,
            //         "updatedOn": {
            //             "seconds": 1715884458,
            //             "nanoseconds": 892726000
            //         },
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FAhiXYI97DiQNtib8dJNoyHObh5i1?alt=media&token=946e47aa-ebe4-4744-a0f5-c77055d60c2e",
            //         "country": "Aruba",
            //         "name": "¡²³¼€¤ tyu",
            //         "idNumber": "½¾€¼ʻ",
            //         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2FIMG-20240429-WA0037.jpg?alt=media&token=641bf623-5522-4e1f-afb8-1462f70dec30",
            //         "provider": "Email",
            //         "fcmToken": "eD6rNuSiTnq5uORULR6zpM:APA91bHS7PRBfyXjfK_Alh5u1Jo22yih5nb7T5KSRXBUem_2FoOzodF_1i5w3yufVZSWX7eRcsbSnznbLE3tbt_jmaqvLa1pWzWLD4H2CWa8_QCqrYYNR9lICt4-P7JBHoPAQ3tp7A24"
            //     },
            //     {
            //         "id": "CwvaHKR3ErRzyB9no9x2JEmtlXg1",
            //         "isComplete": true,
            //         "provider": "Email",
            //         "name": "Joseph Attoh",
            //         "createdOn": {
            //             "seconds": 1715778173,
            //             "nanoseconds": 796220000
            //         },
            //         "phone": "",
            //         "email": "josephansah32@gmail.com",
            //         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2FDrivers%20License.pdf?alt=media&token=e0439caf-9d46-4d06-a85d-1292c150a5d6",
            //         "balance": 0,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FCwvaHKR3ErRzyB9no9x2JEmtlXg1?alt=media&token=82970021-54e7-4152-80e8-5543023533ce",
            //         "gender": "Male",
            //         "nationalID": "Driving License",
            //         "status": true,
            //         "fcmToken": "ewhyUQfrT_-GDZT9DtkNfD:APA91bHLrnSzB25r4jFpINZcbiP60HnnJRr2MyB6vcZojKjOEqdJSQ85sesjQ87_VvM2pOvpWDwU9s9Pu-pEt9mncgiaUiz6CU6pr1kAoLkSGvmWtVUgn9n7odQ2uIx6t__jNNe5zX1I",
            //         "country": "Ghana",
            //         "idNumber": "19038413G1",
            //         "role": "Tutor",
            //         "onHold": false,
            //         "subjects": [
            //             "QB0NCgQqsLoxRoLmWfQm",
            //             "vmRMwcMpVK96IgHpjlhT"
            //         ],
            //         "updatedOn": {
            //             "seconds": 1715778545,
            //             "nanoseconds": 197193000
            //         },
            //         "dateofbirth": {
            //             "seconds": 1715778220,
            //             "nanoseconds": 380151000
            //         }
            //     },
            //     {
            //         "id": "lqltyclDl7cuCRbYeI7l5v6vwz42",
            //         "dateofbirth": {
            //             "seconds": 1713380400,
            //             "nanoseconds": 0
            //         },
            //         "email": "htariq006@gmail.com",
            //         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2Fdummy.pdf?alt=media&token=bd52a1bf-2984-4213-88cd-ded7203d8697",
            //         "isComplete": true,
            //         "country": "France",
            //         "createdOn": {
            //             "seconds": 1713463445,
            //             "nanoseconds": 800972000
            //         },
            //         "balance": 0,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FlqltyclDl7cuCRbYeI7l5v6vwz42?alt=media&token=12896dbd-f85c-44ee-adec-be7e8c04f4bc",
            //         "phone": "",
            //         "provider": "Email",
            //         "name": "Hamza Tariq",
            //         "fcmToken": "eT2Oa-NsQqGRqFvtyNonNY:APA91bGF7LX9Z6XlUXS6aQsvGNxrvjNUqWz2MO0goZpALXK70S8uYmXNrsFVTcnYOCcAHfnhFSybGqwAwhCPK7K49D3LKjfCSp5z5HIDsGlxghhsFx2J4ye6kYpo1U_XPP8tZ3K2aQZy",
            //         "subjects": [
            //             "Skeo6s5235k0nOU6Uthp"
            //         ],
            //         "role": "Tutor",
            //         "idNumber": "123456789",
            //         "nationalID": "National ID",
            //         "gender": "Male",
            //         "updatedOn": {
            //             "seconds": 1713463841,
            //             "nanoseconds": 269522000
            //         },
            //         "onHold": false,
            //         "status": true
            //     },
            //     {
            //         "id": "nBWUpGSgkzLa9IW4nCumkBwCum13",
            //         "balance": 16,
            //         "gender": "Male",
            //         "nationalID": "National ID",
            //         "phone": "",
            //         "email": "essumangsolomon@gmail.com",
            //         "dateofbirth": {
            //             "seconds": 735278400,
            //             "nanoseconds": 0
            //         },
            //         "updatedOn": {
            //             "seconds": 1715771545,
            //             "nanoseconds": 449776000
            //         },
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FnBWUpGSgkzLa9IW4nCumkBwCum13?alt=media&token=ea45a4b0-18cd-4a82-9a13-4b0506535c50",
            //         "provider": "Email",
            //         "fcmToken": "cMHugWBJSJS5u3jXmQfQ8x:APA91bH7WgV7_ELOPixVH-VyoEhkoO_O_e1lozSbSsuRXNftR_nDtWK-YeqJ9tSeEJQ_6r8FryfPGjPOF9pXMlazSNLpSFpHNLLqZJ-0vtXKp-tx5-tkX5NoLyKgafD1gfHLVcsCVkhc",
            //         "createdOn": {
            //             "seconds": 1713794583,
            //             "nanoseconds": 650187000
            //         },
            //         "idNumber": "81098189038",
            //         "name": "Solomon Essumang ",
            //         "subjects": [
            //             "z2bO2FlmEMCDGkPUrdCw",
            //             "Skeo6s5235k0nOU6Uthp",
            //             "x8x6ioZ0y3tlGVRkJDSz",
            //             "GWFW14ezjgoDhEzNh1lb",
            //             "QvPGR5A39zmICHrypkd0",
            //             "fkNVZS7K5sU7s7GW2Yc2",
            //             "P0NCRT82WZPQUOiIBQwp",
            //             "tJAjGwOkOK7BBWePlRlZ",
            //             "6nnaRXk3Lu2GBNpNtbFl",
            //             "UnJuHln4NSlaY3F5rLzK",
            //             "XMkheXj2veBRuhl4l2GE",
            //             "QB0NCgQqsLoxRoLmWfQm",
            //             "jEFdoZD5FNWE8I13eAwj",
            //             "GTOe5fdF8XRVxfT5vbcm",
            //             "QrHuGYvHS2PB9wKHJxMd",
            //             "789Rhm9oPmh0lTntg4p3",
            //             "yCON1lyHOEeYUQNCJVJq",
            //             "vimvtWOOSSWQcsxulUg0",
            //             "5gQgMxVEbF649Ksb4XMY"
            //         ],
            //         "status": true,
            //         "role": "Tutor",
            //         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2FBlue%20Minimalist%20Online%20Course.%20Course%20Template.%20Instagram%20Story..pdf?alt=media&token=cab6aba0-e0e6-40d3-880f-1ebc01a299ea",
            //         "onHold": false,
            //         "isComplete": true,
            //         "country": "United States"
            //     },
            //     {
            //         "id": "qm1B5OCYu9c49ZQ45yzDGtljtQm2",
            //         "updatedOn": {
            //             "seconds": 1716015725,
            //             "nanoseconds": 654854000
            //         },
            //         "dateofbirth": {
            //             "seconds": 1716015725,
            //             "nanoseconds": 654854000
            //         },
            //         "status": true,
            //         "phone": "",
            //         "idNumber": "",
            //         "createdOn": {
            //             "seconds": 1716015725,
            //             "nanoseconds": 654853000
            //         },
            //         "country": "",
            //         "fcmToken": "emzpo7jhRKCO20rZjhjtND:APA91bFJEyD8mMysNWymH3EyUqaZ0KMa5bASxXVswh_q6ErEEPcSMwtEeV1mkg8kBAOpgOcktoRNKcn0lddUzsyQcVeIJGU8T8ulddF8p-0LDv3VyLxqWv-TCRRwTYbViA3cGD0T0fsw",
            //         "subjects": [],
            //         "role": "Tutor",
            //         "nationalID": "",
            //         "gender": "Unknown",
            //         "name": "Xose Amevinya",
            //         "idImageurl": "",
            //         "balance": 0,
            //         "isComplete": false,
            //         "email": "xosenewton@gmail.com",
            //         "imageUrl": "https://lh3.googleusercontent.com/a/ACg8ocK7PGflt8ZbfZgogfmbeq-EG5j1imthyuRy0gq30aQAel8NXwof=s96-c",
            //         "onHold": false,
            //         "provider": "Google"
            //     },
            //     {
            //         "id": "W4TBkHsougeHseWhazcXPVlHDlB3",
            //         "country": "Ghana",
            //         "nationalID": "National ID",
            //         "phone": "",
            //         "subjects": [
            //             "rNFBbx5zp6fM0q81ZseO",
            //             "QB0NCgQqsLoxRoLmWfQm"
            //         ],
            //         "status": true,
            //         "email": "kpodo.mily@gmail.com",
            //         "dateofbirth": {
            //             "seconds": 795398400,
            //             "nanoseconds": 0
            //         },
            //         "role": "Tutor",
            //         "idNumber": "GHA-001411593-4",
            //         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2FIMG_20240107_213512_875.jpg?alt=media&token=86c6c951-1507-42f3-acd0-7cccf64efacd",
            //         "gender": "Female",
            //         "onHold": false,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FW4TBkHsougeHseWhazcXPVlHDlB3?alt=media&token=89cfefb0-29af-482f-9f90-0b534e8ccfd8",
            //         "provider": "Email",
            //         "isComplete": true,
            //         "createdOn": {
            //             "seconds": 1715798180,
            //             "nanoseconds": 332885000
            //         },
            //         "balance": 0,
            //         "fcmToken": "da-NzTduQQ60TQh5UOOGiO:APA91bE56nM5Srmr0tzmfSxuTjHojhFriu4TfdziMjGi_Pln5f6S07H73wYcAY6jm8wUnW_3J-ztJNO75abmR7teEUIKdh64DvhmAfSmahGC8YxbsrdWhH89ATLoesX7KznqEr7tvZas",
            //         "name": "Emelia Kpodo ",
            //         "updatedOn": {
            //             "seconds": 1715802918,
            //             "nanoseconds": 186176000
            //         }
            //     },
            //     {
            //         "id": "zTj52HPLAdUmxfFkXE0Fe0FNoMi2",
            //         "phone": "",
            //         "updatedOn": {
            //             "seconds": 1713944432,
            //             "nanoseconds": 840046000
            //         },
            //         "fcmToken": "cMHugWBJSJS5u3jXmQfQ8x:APA91bH7WgV7_ELOPixVH-VyoEhkoO_O_e1lozSbSsuRXNftR_nDtWK-YeqJ9tSeEJQ_6r8FryfPGjPOF9pXMlazSNLpSFpHNLLqZJ-0vtXKp-tx5-tkX5NoLyKgafD1gfHLVcsCVkhc",
            //         "idImageurl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/tutor_id%2F3bytelabs%20Retainer.pdf?alt=media&token=af4cc71f-a020-45f2-b208-c8db19d7b0ec",
            //         "onHold": false,
            //         "country": "Pakistan",
            //         "balance": 2,
            //         "email": "developer.cs001@gmail.com",
            //         "gender": "Male",
            //         "status": true,
            //         "provider": "Google",
            //         "nationalID": "National ID",
            //         "role": "Tutor",
            //         "subjects": [
            //             "QB0NCgQqsLoxRoLmWfQm",
            //             "QrHuGYvHS2PB9wKHJxMd"
            //         ],
            //         "isComplete": true,
            //         "dateofbirth": {
            //             "seconds": 1713898800,
            //             "nanoseconds": 0
            //         },
            //         "name": "Naeem Tutor",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FzTj52HPLAdUmxfFkXE0Fe0FNoMi2?alt=media&token=01cf5ae9-4f61-43b9-b873-1486d7192ff8",
            //         "createdOn": {
            //             "seconds": 1713944227,
            //             "nanoseconds": 878068000
            //         },
            //         "idNumber": "426273838393"
            //     }
            // ]
this.tutors =  this.tutors.filter(res=> res.onHold == false)
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

}
