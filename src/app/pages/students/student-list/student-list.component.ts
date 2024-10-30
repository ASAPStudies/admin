import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { IStudent } from '../student.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {



    // Variables
    students:IStudent[]=[]
    isLoading:boolean = false;
    search:string = '';
    jsonData = this.students;


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
        {field:'action',title:'Action'}
    ];


    ngOnInit() {

    }

    // fetch students
    async loadUsers() {
        try {
            this.isLoading = true;
            this.students = await this.userService.getUsers('Student');
            // this.students = [
            //     {
            //         "id": "1KNvtZZmwJflM6P33WkSEK620R63",
            //         "fcmToken": "dnjNl8ZR60v_orjSkOQ281:APA91bG2vKu4kLKBn9WlzDzUxZeA4BpsgLDbJjPwg0Z2-FjqyTMGJepqg-X0Y7ZXKepW0MW5kM8MKoFpyCdkpogReCPnaZVE0DUpaYmAXWuHfCHLYpTEFDRiZb2KNyAiQiO3EkknKXFi",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2F1KNvtZZmwJflM6P33WkSEK620R63?alt=media&token=29be0e21-f220-4ca5-bd41-7af7332e2446",
            //         "gender": "Male",
            //         "phone": "",
            //         "country": "Angola",
            //         "updatedOn": {
            //             "seconds": 1715704772,
            //             "nanoseconds": 362500000
            //         },
            //         "status": true,
            //         "subjects": [],
            //         "onHold": false,
            //         "name": "Tina Sims",
            //         "provider": "Apple",
            //         "nationalID": "",
            //         "email": "bp9tn4nbs6@privaterelay.appleid.com",
            //         "idImageurl": "",
            //         "createdOn": {
            //             "seconds": 1715704558,
            //             "nanoseconds": 448629000
            //         },
            //         "idNumber": "",
            //         "balance": 0,
            //         "role": "Student",
            //         "dateofbirth": {
            //             "seconds": 1527836400,
            //             "nanoseconds": 0
            //         },
            //         "isComplete": true
            //     },
            //     {
            //         "id": "2VLTQ5zj2QMISdZUYxirMbEpfpC2",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2F2VLTQ5zj2QMISdZUYxirMbEpfpC2?alt=media&token=80dd07f3-acb2-4e71-9e73-bd5a7c65040c",
            //         "nationalID": "",
            //         "phone": "",
            //         "email": "koteychristiana8@gmail.com",
            //         "name": "Christiana Kotey",
            //         "onHold": false,
            //         "isComplete": true,
            //         "country": "Ghana",
            //         "subjects": [],
            //         "createdOn": {
            //             "seconds": 1715749305,
            //             "nanoseconds": 864821000
            //         },
            //         "fcmToken": "fP_TqN0-8E28mjKeZm2G8Y:APA91bGeYH4zcRnN3ZSeW0fgjWcO2TfT8B5ZFHGk2tvno5Z45t7_9-LbSG2spkz0zUeiggGtug-idihUWJ2CsswCRcS-L2VeOAEsUNEFX5wfxoP_EmEgSssNIGq7kmMdFJJESUPNPiL_",
            //         "idNumber": "",
            //         "gender": "Female",
            //         "updatedOn": {
            //             "seconds": 1715749385,
            //             "nanoseconds": 799199000
            //         },
            //         "provider": "Apple",
            //         "status": true,
            //         "idImageurl": "",
            //         "balance": 0,
            //         "role": "Student",
            //         "dateofbirth": {
            //             "seconds": 1715731200,
            //             "nanoseconds": 0
            //         }
            //     },
            //     {
            //         "id": "bAYMej2oCWb07ddS7GQ5zOtG37u2",
            //         "dateofbirth": {
            //             "seconds": 1712689200,
            //             "nanoseconds": 0
            //         },
            //         "idImageurl": "",
            //         "email": "mehamza896@gmail.com",
            //         "status": true,
            //         "idNumber": "",
            //         "phone": "",
            //         "createdOn": {
            //             "seconds": 1713462800,
            //             "nanoseconds": 692147000
            //         },
            //         "provider": "Email",
            //         "subjects": [],
            //         "fcmToken": "eT2Oa-NsQqGRqFvtyNonNY:APA91bGF7LX9Z6XlUXS6aQsvGNxrvjNUqWz2MO0goZpALXK70S8uYmXNrsFVTcnYOCcAHfnhFSybGqwAwhCPK7K49D3LKjfCSp5z5HIDsGlxghhsFx2J4ye6kYpo1U_XPP8tZ3K2aQZy",
            //         "role": "Student",
            //         "gender": "Male",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FbAYMej2oCWb07ddS7GQ5zOtG37u2?alt=media&token=c0f1638b-c5b4-4d66-ba44-a1e5f406d6fd",
            //         "updatedOn": {
            //             "seconds": 1713462871,
            //             "nanoseconds": 69728000
            //         },
            //         "onHold": false,
            //         "nationalID": "",
            //         "name": "Hamza Tariq",
            //         "country": "France",
            //         "isComplete": true,
            //         "balance": 0
            //     },
            //     {
            //         "id": "Cl9dMBYsmOXbQH1F99qEQsv6ZfJ3",
            //         "nationalID": "",
            //         "isComplete": true,
            //         "updatedOn": {
            //             "seconds": 1715710441,
            //             "nanoseconds": 35609000
            //         },
            //         "balance": 0,
            //         "name": "Lord Aggrey Jnr",
            //         "idImageurl": "",
            //         "role": "Student",
            //         "country": "Ghana",
            //         "email": "lordaggreyjnr@gmail.com",
            //         "subjects": [],
            //         "idNumber": "",
            //         "status": true,
            //         "fcmToken": "dr2DZ7nXQrOxttGsdnQQUI:APA91bGzz_MqR6xqIKwkgP0DvN4p1BFnVlUgDmP8aMPV70TwEoRK0mFTl1hoKpShmVZ88veSlQuPDFEOzvjcQ6ulk8-rlnEgxNAOygJ3mDsbvRRmt8SNBVkC15GtOEjbDBx2JVdxz3_o",
            //         "provider": "Email",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FCl9dMBYsmOXbQH1F99qEQsv6ZfJ3?alt=media&token=6ed7b9dd-6db3-49c2-8eb0-2dcc8b7f74b8",
            //         "gender": "Male",
            //         "createdOn": {
            //             "seconds": 1715709479,
            //             "nanoseconds": 698176000
            //         },
            //         "phone": "",
            //         "onHold": false,
            //         "dateofbirth": {
            //             "seconds": 1715644800,
            //             "nanoseconds": 0
            //         }
            //     },
            //     {
            //         "id": "dHfMdyFCzGPlK8wecVsGEzo6pL23",
            //         "role": "Student",
            //         "idNumber": "",
            //         "country": "France",
            //         "updatedOn": {
            //             "seconds": 1716061893,
            //             "nanoseconds": 357143000
            //         },
            //         "dateofbirth": {
            //             "seconds": 912384000,
            //             "nanoseconds": 0
            //         },
            //         "email": "amorakora06@gmail.com",
            //         "phone": "",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FdHfMdyFCzGPlK8wecVsGEzo6pL23?alt=media&token=5ddbee34-519e-4a38-ad78-963ccf9fa074",
            //         "nationalID": "",
            //         "fcmToken": "cyrdtiCQ6EwxuiSTvo1ma_:APA91bFC1wECXwrQIVfUd-RHhkr_CswLE9MMbNCpSmJBFqlTsBB_cYdwrRagu2xxq6QsrZarcaLguWCAVkeUQXJxoSXpbyaXdeIgSgizF7z5Wdx-30nBjGGAyK4JqIiTvZzDQCwtOkI4",
            //         "name": "",
            //         "createdOn": {
            //             "seconds": 1716061762,
            //             "nanoseconds": 493395000
            //         },
            //         "idImageurl": "",
            //         "isComplete": true,
            //         "subjects": [],
            //         "onHold": false,
            //         "provider": "Email",
            //         "status": true,
            //         "balance": 0,
            //         "gender": "Male"
            //     },
            //     {
            //         "id": "dNO4VTKzFIbZMS28Nd2VJCOKlf73",
            //         "subjects": [],
            //         "name": "Infar Samura",
            //         "country": "United States",
            //         "provider": "Apple",
            //         "nationalID": "",
            //         "status": true,
            //         "dateofbirth": {
            //             "seconds": 914475600,
            //             "nanoseconds": 0
            //         },
            //         "balance": 0,
            //         "onHold": false,
            //         "idImageurl": "",
            //         "email": "mustaphasamura101@gmail.com",
            //         "fcmToken": "eRbRK1bsUUwdtJaQQWKsfS:APA91bFDdF16xcQZrUeu0rg9psaj82QFRCVTueN0Hd38Ut49N-DkLd4RiK3lNbc68CWnlR-D7pStR7B81MnJPK7hpQdp2VX3bAxuRWqhEJK19291BuxGvvVGp5BakYs3Fb8fn--AOC-Z",
            //         "createdOn": {
            //             "seconds": 1715743024,
            //             "nanoseconds": 605053000
            //         },
            //         "phone": "",
            //         "gender": "Male",
            //         "idNumber": "",
            //         "isComplete": true,
            //         "role": "Student",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FdNO4VTKzFIbZMS28Nd2VJCOKlf73?alt=media&token=b92990ea-fc83-484e-8764-e8d744f25cc7",
            //         "updatedOn": {
            //             "seconds": 1715743163,
            //             "nanoseconds": 240198000
            //         }
            //     },
            //     {
            //         "id": "eMuDsjyX4ZPv83xVXOJWTZPzDTS2",
            //         "updatedOn": {
            //             "seconds": 1715436552,
            //             "nanoseconds": 60195000
            //         },
            //         "idImageurl": "",
            //         "provider": "Apple",
            //         "subjects": [],
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FeMuDsjyX4ZPv83xVXOJWTZPzDTS2?alt=media&token=dd71c7cb-227c-4e06-9c17-2f277d0c01de",
            //         "isComplete": true,
            //         "phone": "",
            //         "name": "I ",
            //         "balance": 0,
            //         "gender": "Other",
            //         "role": "Student",
            //         "status": true,
            //         "dateofbirth": {
            //             "seconds": 1715410800,
            //             "nanoseconds": 0
            //         },
            //         "nationalID": "",
            //         "createdOn": {
            //             "seconds": 1715436189,
            //             "nanoseconds": 374381000
            //         },
            //         "email": "9w29dkxtnf@privaterelay.appleid.com",
            //         "country": "Aruba",
            //         "fcmToken": "fvC8TOzUa0CvmTgx_japIz:APA91bGOYwdf9rL0cjGmcCMy90mQsok8-X0YntMMSxQfs9UJu0VMZXel6m2v-s8sJUUzW2gbegR3rlhNxujM04QO8ay0AR7oKTWIGIpGrr1Bcb8mbNGTCeiYjGWi-cZWWGy8rLrSImpR",
            //         "onHold": false,
            //         "idNumber": ""
            //     },
            //     {
            //         "id": "eOuWkKChFAZgIyTRWgiHhEZkM8l2",
            //         "idNumber": "",
            //         "nationalID": "",
            //         "balance": 0,
            //         "name": "",
            //         "isComplete": false,
            //         "provider": "Apple",
            //         "createdOn": {
            //             "seconds": 1715511586,
            //             "nanoseconds": 138618000
            //         },
            //         "dateofbirth": {
            //             "seconds": 1715511586,
            //             "nanoseconds": 138619000
            //         },
            //         "phone": "",
            //         "email": "snk987z5wx@privaterelay.appleid.com",
            //         "status": true,
            //         "role": "Student",
            //         "fcmToken": "fO22gteaRUTIh1BKTHlBny:APA91bFf2j44UlDiQ3t2QcKGqvoJi4r7qORfelXISzXYB9q9ifooxDOioKpNmjCoaS40pOPhiBZRpoGq_xcdrZz4rdIFAK5H5pzIvLUVZOhja0YK9eLv3D-adS9s5VZwp9nmO-HiF2e3",
            //         "gender": "Unknown",
            //         "idImageurl": "",
            //         "imageUrl": "",
            //         "onHold": false,
            //         "country": "",
            //         "subjects": [],
            //         "updatedOn": {
            //             "seconds": 1715511586,
            //             "nanoseconds": 138619000
            //         }
            //     },
            //     {
            //         "id": "HdGPctLuiPZuETRcot8dx2HgS6E2",
            //         "balance": 0,
            //         "idNumber": "",
            //         "subjects": [],
            //         "phone": "",
            //         "updatedOn": {
            //             "seconds": 1714646299,
            //             "nanoseconds": 813560000
            //         },
            //         "createdOn": {
            //             "seconds": 1714646164,
            //             "nanoseconds": 429196000
            //         },
            //         "isComplete": true,
            //         "nationalID": "",
            //         "country": "France",
            //         "gender": "Male",
            //         "provider": "",
            //         "idImageurl": "",
            //         "email": "love20922@gmail.com",
            //         "name": "jav",
            //         "dateofbirth": {
            //             "seconds": 1714503600,
            //             "nanoseconds": 0
            //         },
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FHdGPctLuiPZuETRcot8dx2HgS6E2?alt=media&token=e0bb5166-805e-43a3-8afe-c7dbce495c4e",
            //         "onHold": false,
            //         "fcmToken": "eD6rNuSiTnq5uORULR6zpM:APA91bHS7PRBfyXjfK_Alh5u1Jo22yih5nb7T5KSRXBUem_2FoOzodF_1i5w3yufVZSWX7eRcsbSnznbLE3tbt_jmaqvLa1pWzWLD4H2CWa8_QCqrYYNR9lICt4-P7JBHoPAQ3tp7A24",
            //         "role": "Student",
            //         "status": true
            //     },
            //     {
            //         "id": "IdLMx4TpNPfFEp1vtg2CPiRnPI42",
            //         "gender": "Unknown",
            //         "email": "hd9cjpty7d@privaterelay.appleid.com",
            //         "dateofbirth": {
            //             "seconds": 1715380655,
            //             "nanoseconds": 809718000
            //         },
            //         "balance": 0,
            //         "updatedOn": {
            //             "seconds": 1715380655,
            //             "nanoseconds": 809718000
            //         },
            //         "country": "",
            //         "idNumber": "",
            //         "fcmToken": "cEejlAhlu0b1tDC7aGrKhT:APA91bEIWp-ah-Mfu2Wbdu_Tn3Q9Q6erHcATsPu1YNDhDM_8IzIjxIr3-a8KOJo_fOrkA2qO2eiujlpoRw4fP4Wn_vvGxExk8rwUDaqI9_bPaiAS5uft0btzVkzkFe3X3xRAYvh0wG7m",
            //         "idImageurl": "",
            //         "subjects": [],
            //         "phone": "",
            //         "status": true,
            //         "provider": "Apple",
            //         "role": "Student",
            //         "onHold": false,
            //         "isComplete": false,
            //         "nationalID": "",
            //         "imageUrl": "",
            //         "name": "",
            //         "createdOn": {
            //             "seconds": 1715380655,
            //             "nanoseconds": 809718000
            //         }
            //     },
            //     {
            //         "id": "JioExKmoaDcLDqFiN2LpeeBCesd2",
            //         "subjects": [],
            //         "imageUrl": "",
            //         "provider": "Email",
            //         "country": "",
            //         "gender": "Unknown",
            //         "onHold": false,
            //         "name": "",
            //         "isComplete": false,
            //         "phone": "",
            //         "role": "Student",
            //         "status": true,
            //         "balance": 0,
            //         "nationalID": "",
            //         "email": "agglordjunior6000@gmail.com",
            //         "createdOn": {
            //             "seconds": 1715965433,
            //             "nanoseconds": 124047000
            //         },
            //         "fcmToken": "dr2DZ7nXQrOxttGsdnQQUI:APA91bGzz_MqR6xqIKwkgP0DvN4p1BFnVlUgDmP8aMPV70TwEoRK0mFTl1hoKpShmVZ88veSlQuPDFEOzvjcQ6ulk8-rlnEgxNAOygJ3mDsbvRRmt8SNBVkC15GtOEjbDBx2JVdxz3_o",
            //         "updatedOn": {
            //             "seconds": 1715965433,
            //             "nanoseconds": 124048000
            //         },
            //         "dateofbirth": {
            //             "seconds": 1715965433,
            //             "nanoseconds": 124048000
            //         },
            //         "idNumber": "",
            //         "idImageurl": ""
            //     },
            //     {
            //         "id": "LS3bZG3Hz3Soy4orQa4cXmuwL9q2",
            //         "idImageurl": "",
            //         "country": "France",
            //         "balance": 0,
            //         "status": true,
            //         "phone": "",
            //         "role": "Student",
            //         "createdOn": {
            //             "seconds": 1715713683,
            //             "nanoseconds": 30664000
            //         },
            //         "provider": "Apple",
            //         "dateofbirth": {
            //             "seconds": 484470000,
            //             "nanoseconds": 0
            //         },
            //         "updatedOn": {
            //             "seconds": 1715713726,
            //             "nanoseconds": 284078000
            //         },
            //         "email": "appreview1086@icloud.com",
            //         "onHold": false,
            //         "nationalID": "",
            //         "subjects": [],
            //         "isComplete": true,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FLS3bZG3Hz3Soy4orQa4cXmuwL9q2?alt=media&token=5072905b-e56c-4660-8aae-08009edb2c5a",
            //         "fcmToken": "fv5FX2930Uy7oIwGLVFmFf:APA91bGJ_DC86xw9ArUdy-SKddH1Ccz1CMkkbUacWnh0R5rSHTmsdmqBAH83f5QVZwVJ7j7bgJM24KiPPVUM3MIHbBhwn2PQ1kvWSTxYI1XjdWLtcifI3cGamtU6326T8bTmJWNXqeJN",
            //         "name": "Apple John",
            //         "idNumber": "",
            //         "gender": "Male"
            //     },
            //     {
            //         "id": "lTu66m0hzpdpDlukatPeMiUES183",
            //         "gender": "Male",
            //         "name": "Abdul Haque Yahaya ",
            //         "status": true,
            //         "onHold": false,
            //         "idNumber": "",
            //         "provider": "Email",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FlTu66m0hzpdpDlukatPeMiUES183?alt=media&token=37aed6ce-1aa1-4fda-8deb-d2dc4eca90a7",
            //         "createdOn": {
            //             "seconds": 1715696934,
            //             "nanoseconds": 466521000
            //         },
            //         "fcmToken": "cbWXZ45pSsK5J4noIYN81F:APA91bGhWCBwnH31EgP2ESfIOANGi9I9LoXDP7FqUI_ogOF3ZmSsGekZ2WE1MZX7zaX_WHTzYrQc5PxTOvCJySHrKddHb0eaAKp1aSBWgZXbjbU6_66sDXz6cp68SyU6a-0RX3cW7Hec",
            //         "role": "Student",
            //         "phone": "",
            //         "email": "yelpoeayahaya@gmail.com",
            //         "country": "Ghana",
            //         "isComplete": true,
            //         "idImageurl": "",
            //         "updatedOn": {
            //             "seconds": 1715697112,
            //             "nanoseconds": 387411000
            //         },
            //         "balance": 0,
            //         "dateofbirth": {
            //             "seconds": 1070582400,
            //             "nanoseconds": 0
            //         },
            //         "subjects": [],
            //         "nationalID": ""
            //     },
            //     {
            //         "id": "lZAj4KcyA4Mir1P9xvtdBsUG3ju2",
            //         "idImageurl": "",
            //         "dateofbirth": {
            //             "seconds": 1715644800,
            //             "nanoseconds": 0
            //         },
            //         "phone": "",
            //         "fcmToken": "cONsm4grBE5bkXwA-31qHo:APA91bGTlMDCt3iCeaIWBKUNRkTypyEE8-4Tk0x0rAVmo69zdDIDIKFwxaMU9OMjYgXR4MK7eRpezSB4Z1W2NfSjU3EM2j5dhediq7rvdVdmztwPKc-B2R5OLb3ZyzLSS3DtZ3zlMHo2",
            //         "gender": "Male",
            //         "name": "Ndaku Kaakyir3",
            //         "idNumber": "",
            //         "email": "salomecalebina.a@gmail.com",
            //         "nationalID": "",
            //         "subjects": [],
            //         "provider": "Apple",
            //         "country": "Ghana",
            //         "updatedOn": {
            //             "seconds": 1715720155,
            //             "nanoseconds": 111360000
            //         },
            //         "status": true,
            //         "role": "Student",
            //         "isComplete": true,
            //         "onHold": false,
            //         "balance": 0,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FlZAj4KcyA4Mir1P9xvtdBsUG3ju2?alt=media&token=c85fd03e-9f88-405b-a28b-ee4b4b518743",
            //         "createdOn": {
            //             "seconds": 1715720044,
            //             "nanoseconds": 838787000
            //         }
            //     },
            //     {
            //         "id": "oxOWtVIs2pNXEsMmtWlujShFGm63",
            //         "fcmToken": "cZ1tV8TdEUWPlnSlcIHDr5:APA91bFVYXrXVYeCp48p7Yr0c1zgU2zAMX-hd-NtgxAlLK9TFIeHDoz1et7qb9-3TZpnGnflQf1_5ot4YscG0MMxGRiO11Xt6ihWkVVjDzNnLpSE_cyHyodhvdeuAhy4q-sr1umTevRU",
            //         "dateofbirth": {
            //             "seconds": 863506800,
            //             "nanoseconds": 0
            //         },
            //         "gender": "Male",
            //         "subjects": [],
            //         "provider": "Apple",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FoxOWtVIs2pNXEsMmtWlujShFGm63?alt=media&token=3f303256-107c-4cae-b8a1-998eed75f802",
            //         "isComplete": true,
            //         "country": "France",
            //         "idImageurl": "",
            //         "phone": "",
            //         "idNumber": "",
            //         "role": "Student",
            //         "nationalID": "",
            //         "name": "apple",
            //         "status": true,
            //         "balance": 0,
            //         "updatedOn": {
            //             "seconds": 1715654701,
            //             "nanoseconds": 884289000
            //         },
            //         "onHold": false,
            //         "createdOn": {
            //             "seconds": 1715654598,
            //             "nanoseconds": 612448000
            //         },
            //         "email": "jf77x4vjs8@privaterelay.appleid.com"
            //     },
            //     {
            //         "id": "OzMOX8kSvZZFWmArSbevygK5Kag2",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FOzMOX8kSvZZFWmArSbevygK5Kag2?alt=media&token=8c82719c-9443-43e7-b458-4d4b16df5702",
            //         "email": "appiahemmanuella466@gmail.com",
            //         "idNumber": "",
            //         "phone": "",
            //         "fcmToken": "etn_sRVq9ULbiM1056gVZl:APA91bFZYapELuqtKl7rf4orfvac87OmiNJ9UCXVSZBsPJmO080TbyhAMZ8j_vQI_HRajkw78a2dAVsGYkC3cqugzivOOnVlZphkQvTiwVGJJghVT-vta6R6Lh3KSplxlogaKSSwYB6g",
            //         "onHold": false,
            //         "balance": 0,
            //         "country": "Ghana",
            //         "gender": "Female",
            //         "updatedOn": {
            //             "seconds": 1716038950,
            //             "nanoseconds": 495983000
            //         },
            //         "nationalID": "",
            //         "status": true,
            //         "createdOn": {
            //             "seconds": 1716038842,
            //             "nanoseconds": 121650000
            //         },
            //         "dateofbirth": {
            //             "seconds": 971568000,
            //             "nanoseconds": 0
            //         },
            //         "idImageurl": "",
            //         "subjects": [],
            //         "role": "Student",
            //         "isComplete": true,
            //         "name": "Emmanuella Appiah",
            //         "provider": "Apple"
            //     },
            //     {
            //         "id": "qkL50A0n7TYUGLHS4JpUVaGy9bb2",
            //         "subjects": [],
            //         "status": true,
            //         "provider": "Apple",
            //         "imageUrl": "",
            //         "nationalID": "",
            //         "onHold": false,
            //         "idImageurl": "",
            //         "email": "6fqqvt2k95@privaterelay.appleid.com",
            //         "balance": 0,
            //         "country": "",
            //         "dateofbirth": {
            //             "seconds": 1715969315,
            //             "nanoseconds": 265944000
            //         },
            //         "fcmToken": "dJZxmOAgJ0_ji2UyHRHfnd:APA91bEr3w6IpubTonGgIXqokF_fxc318Rh685wQAwp7_4PeBXeOAemutoBlvGNXCx66QBEVbQk3cqexMVFT5MVOty4fZN9nywieBOqkXGaE0rnToPAwgQa1wGSOLSl0JLJt9ETsZtGu",
            //         "gender": "Unknown",
            //         "idNumber": "",
            //         "updatedOn": {
            //             "seconds": 1715969315,
            //             "nanoseconds": 265944000
            //         },
            //         "isComplete": false,
            //         "name": "",
            //         "createdOn": {
            //             "seconds": 1715969315,
            //             "nanoseconds": 265944000
            //         },
            //         "phone": "",
            //         "role": "Student"
            //     },
            //     {
            //         "id": "riEF0B456ZcPuRjwD3BPc3FvmoV2",
            //         "provider": "Email",
            //         "email": "prince.invest101@gmail.com",
            //         "updatedOn": {
            //             "seconds": 1715810091,
            //             "nanoseconds": 695324000
            //         },
            //         "nationalID": "",
            //         "gender": "Male",
            //         "isComplete": true,
            //         "status": true,
            //         "idNumber": "",
            //         "balance": 0,
            //         "idImageurl": "",
            //         "phone": "",
            //         "dateofbirth": {
            //             "seconds": 590112000,
            //             "nanoseconds": 0
            //         },
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FriEF0B456ZcPuRjwD3BPc3FvmoV2?alt=media&token=f43387df-978d-4910-ab71-1b634b842591",
            //         "onHold": false,
            //         "name": "Prince Yeboah Ntim",
            //         "country": "United States",
            //         "createdOn": {
            //             "seconds": 1715809958,
            //             "nanoseconds": 821364000
            //         },
            //         "role": "Student",
            //         "fcmToken": "ddJmKSY-ZEorshrX_VWktu:APA91bGTv0hXpGvPXQk-y-AirPB-QQEZodPD2W7ej_7L6lDeptzGd8nGVQWsIEX6gTK4Su7d5co7hVCc9ZdSbsD1Y7SYB4WBTQ-AX6r3Tpwg4tlIho-9pSneWCqQCHQl-a51HS0eOPbi",
            //         "subjects": []
            //     },
            //     {
            //         "id": "RJfWY2cIYAh7JEJC7cDDAMZnCjE2",
            //         "subjects": [],
            //         "nationalID": "",
            //         "isComplete": false,
            //         "email": "kevinharis02722@gmail.com",
            //         "role": "Student",
            //         "fcmToken": "cbWXZ45pSsK5J4noIYN81F:APA91bGhWCBwnH31EgP2ESfIOANGi9I9LoXDP7FqUI_ogOF3ZmSsGekZ2WE1MZX7zaX_WHTzYrQc5PxTOvCJySHrKddHb0eaAKp1aSBWgZXbjbU6_66sDXz6cp68SyU6a-0RX3cW7Hec",
            //         "onHold": false,
            //         "dateofbirth": {
            //             "seconds": 1715863033,
            //             "nanoseconds": 645226000
            //         },
            //         "status": true,
            //         "imageUrl": "",
            //         "gender": "Unknown",
            //         "phone": "",
            //         "balance": 0,
            //         "createdOn": {
            //             "seconds": 1715863033,
            //             "nanoseconds": 645222000
            //         },
            //         "country": "",
            //         "idNumber": "",
            //         "name": "",
            //         "updatedOn": {
            //             "seconds": 1715863033,
            //             "nanoseconds": 645227000
            //         },
            //         "idImageurl": "",
            //         "provider": ""
            //     },
            //     {
            //         "id": "RmeRtxIkwdMAwy81WUwv0eUdRql1",
            //         "isComplete": true,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FRmeRtxIkwdMAwy81WUwv0eUdRql1?alt=media&token=1b167e2c-933a-4b49-95ec-937241ac3367",
            //         "role": "Student",
            //         "provider": "Apple",
            //         "gender": "Male",
            //         "balance": 0,
            //         "dateofbirth": {
            //             "seconds": 1715626800,
            //             "nanoseconds": 0
            //         },
            //         "status": true,
            //         "email": "arsaln000@gmail.com",
            //         "updatedOn": {
            //             "seconds": 1715703343,
            //             "nanoseconds": 447476000
            //         },
            //         "subjects": [],
            //         "onHold": false,
            //         "country": "France",
            //         "idNumber": "",
            //         "nationalID": "",
            //         "fcmToken": "dNIEyYz8VECenfmRoyQLnA:APA91bESNLxn-kpsXDC440Jcm88_zl5LoSLIQJM4U9oXmu7u5_s0yMvGwyuGV97Zy_-Cx-sBOEo4oH66uyujabAdMPlnO8sUgZ1v9qxntvA6n5R1WWraFWO77LmDu-ZKpN5ayQU0bjo4",
            //         "phone": "",
            //         "idImageurl": "",
            //         "name": "Arslan Javed",
            //         "createdOn": {
            //             "seconds": 1715703324,
            //             "nanoseconds": 186797000
            //         }
            //     },
            //     {
            //         "id": "sNDVka5aSLbvcVI2ELd7KI4DnUA3",
            //         "createdOn": {
            //             "seconds": 1715718151,
            //             "nanoseconds": 611630000
            //         },
            //         "balance": 0,
            //         "idImageurl": "",
            //         "subjects": [],
            //         "onHold": false,
            //         "isComplete": true,
            //         "role": "Student",
            //         "fcmToken": "e42p01_FKEhBpQkWKcdHom:APA91bGzjy6nmlOzkfQgY_olo_3SnofPtm9y-GA80EbSDEO7ngStbe3vbIFHaABDeFaQJx4McRR1rRb-dJeCJtqn-gBFEUWxC25VpeAgR45i4557jImitn14dPlsYD3-Va93V4h7DWuS",
            //         "country": "United States",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FsNDVka5aSLbvcVI2ELd7KI4DnUA3?alt=media&token=8764ca95-06a1-48c6-8d9f-522d6cdb3496",
            //         "email": "ngr6ndzyv4@privaterelay.appleid.com",
            //         "phone": "",
            //         "gender": "Female",
            //         "provider": "Apple",
            //         "nationalID": "",
            //         "dateofbirth": {
            //             "seconds": 889765200,
            //             "nanoseconds": 0
            //         },
            //         "idNumber": "",
            //         "status": true,
            //         "updatedOn": {
            //             "seconds": 1715718204,
            //             "nanoseconds": 536139000
            //         },
            //         "name": "Ruth Appiah"
            //     },
            //     {
            //         "id": "ttpSrany7mXLrsOTAPeTrAFe0aj2",
            //         "dateofbirth": {
            //             "seconds": 864684000,
            //             "nanoseconds": 0
            //         },
            //         "name": "Lilian Richling",
            //         "fcmToken": "cDCnbqT2HEunvbiXV5Soys:APA91bE32QyZ2AQRF0J1g8ToI65VVwT-YwArdWfJ6OwB2VIFTiGzcNkWErxDre3vQrJuI02h70Rao4N8yF-RLQ-Jsz-mUKo3wbe5HQJDQcFOYXYcLwb0Bm6nU4Ah0fmuz6S82odmybO6",
            //         "updatedOn": {
            //             "seconds": 1715766690,
            //             "nanoseconds": 861017000
            //         },
            //         "gender": "Female",
            //         "balance": 0,
            //         "role": "Student",
            //         "email": "sn4qgnrjgp@privaterelay.appleid.com",
            //         "subjects": [],
            //         "idNumber": "",
            //         "nationalID": "",
            //         "isComplete": true,
            //         "phone": "",
            //         "createdOn": {
            //             "seconds": 1715766640,
            //             "nanoseconds": 682149000
            //         },
            //         "idImageurl": "",
            //         "status": true,
            //         "onHold": false,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FttpSrany7mXLrsOTAPeTrAFe0aj2?alt=media&token=aa7ecf7c-6a2f-4ddd-9630-1adb344cc829",
            //         "provider": "Apple",
            //         "country": "Deutschland"
            //     },
            //     {
            //         "id": "twqB4LZQlhNtDHWq30Jc6nP16YQ2",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FtwqB4LZQlhNtDHWq30Jc6nP16YQ2?alt=media&token=41890aa7-cc90-4ff0-afe4-1eaadc7418dc",
            //         "fcmToken": "eO_Adok4eEGDr3hH7_n2Qw:APA91bEaPx3qlXRthLM-0an99ci7JE9FuadRG-lGYqlNUnDs3MUymFuxpY83Pfg_3RICoTG-6VfDUw3AllfBk-PZwWcjUbX3bfpgWag2MOhptRvXehuRCMiuFjsGr8UTk_15wzbFSEyW",
            //         "gender": "Male",
            //         "balance": 0,
            //         "country": "United States",
            //         "nationalID": "",
            //         "updatedOn": {
            //             "seconds": 1715952496,
            //             "nanoseconds": 198910000
            //         },
            //         "email": "niiquart@yahoo.com",
            //         "status": true,
            //         "createdOn": {
            //             "seconds": 1715915374,
            //             "nanoseconds": 399279000
            //         },
            //         "role": "Student",
            //         "name": "",
            //         "onHold": false,
            //         "idImageurl": "",
            //         "idNumber": "",
            //         "dateofbirth": {
            //             "seconds": 1715918400,
            //             "nanoseconds": 0
            //         },
            //         "subjects": [],
            //         "phone": "",
            //         "isComplete": true,
            //         "provider": "Email"
            //     },
            //     {
            //         "id": "VNWf18PYRFTxqBXHDyx2NLUFqRj1",
            //         "idImageurl": "",
            //         "dateofbirth": {
            //             "seconds": 735278400,
            //             "nanoseconds": 0
            //         },
            //         "phone": "",
            //         "idNumber": "",
            //         "gender": "Male",
            //         "subjects": [],
            //         "onHold": false,
            //         "name": "Solomon Essumang ",
            //         "email": "se285@njit.edu",
            //         "balance": 0,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FVNWf18PYRFTxqBXHDyx2NLUFqRj1?alt=media&token=53eba6bb-5c31-45cb-8469-93e115775260",
            //         "createdOn": {
            //             "seconds": 1712702559,
            //             "nanoseconds": 423929000
            //         },
            //         "fcmToken": "coJUdUDCg00grOxPIFAKmh:APA91bHGJrwizoFQy4XqSLkyLnnvZIAcx3wmtCH5Vo_8HvK23wXX1yvzS0opyooY0xdkJMFY__C5CczG-IwYLlYgS5jcqsk630Qix-iSR8Xb_Hb9cNZqrkodiQUwi8MaSKSsjWW1gKVp",
            //         "isComplete": true,
            //         "role": "Student",
            //         "status": true,
            //         "nationalID": "",
            //         "provider": "Email",
            //         "country": "Ghana",
            //         "updatedOn": {
            //             "seconds": 1712702868,
            //             "nanoseconds": 114985000
            //         }
            //     },
            //     {
            //         "id": "xUcbMSTDoDWjBihtRWecrI2Kp4f1",
            //         "email": "naeemakram213@gmail.com",
            //         "balance": 0,
            //         "name": "Naeem",
            //         "role": "Student",
            //         "gender": "Male",
            //         "status": true,
            //         "country": "Pakistan",
            //         "onHold": false,
            //         "isComplete": true,
            //         "updatedOn": {
            //             "seconds": 1713944019,
            //             "nanoseconds": 221663000
            //         },
            //         "subjects": [],
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FxUcbMSTDoDWjBihtRWecrI2Kp4f1?alt=media&token=b89ba5a3-1cf1-468b-add9-3a01608ed3ea",
            //         "nationalID": "",
            //         "idNumber": "",
            //         "fcmToken": "c8QbbzcUQtCUY-_g5kJmfc:APA91bFiPzSXiWjXZx4_IWpGwZdbcthGIS4T3M-2oZUz4GCmGTMX0nD9Km-aC_gu4rPr3jSFx2N2BV17pZ1M0sn6SeC7cUWlBz_deMCS3GBLAwGYxxuMYk4WXYeNk68M4im4MZOy7NA-",
            //         "createdOn": {
            //             "seconds": 1713943597,
            //             "nanoseconds": 219970000
            //         },
            //         "provider": "Email",
            //         "dateofbirth": {
            //             "seconds": 1713726000,
            //             "nanoseconds": 0
            //         },
            //         "idImageurl": "",
            //         "phone": ""
            //     },
            //     {
            //         "id": "yP8zLg5BY2M6PD1HVZnGCmu3F3V2",
            //         "fcmToken": "cgUsX4KKtUtroa-RKiJ-RG:APA91bF0zVfKPd2bChLOcsCmP6tSC0OrE1BGhwcB_OsW2oXXmzHDlO1N2oC13NofVzdteQ-Oq-YN0WpeI0quTAWaRcoXnFt_VT2ro1c_FSNdUDSIWMCjhyfnMn-FDeBBiu0igIUbZ9WM",
            //         "provider": "Apple",
            //         "updatedOn": {
            //             "seconds": 1715740468,
            //             "nanoseconds": 970262000
            //         },
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FyP8zLg5BY2M6PD1HVZnGCmu3F3V2?alt=media&token=9acf52a1-694d-4f79-88d6-6e4926ba22a5",
            //         "onHold": false,
            //         "nationalID": "",
            //         "country": "دولة الإمارات العربية المتحدة",
            //         "dateofbirth": {
            //             "seconds": 1054699200,
            //             "nanoseconds": 0
            //         },
            //         "balance": 0,
            //         "isComplete": true,
            //         "role": "Student",
            //         "createdOn": {
            //             "seconds": 1715740380,
            //             "nanoseconds": 842207000
            //         },
            //         "email": "275nypzknj@privaterelay.appleid.com",
            //         "phone": "",
            //         "subjects": [],
            //         "status": true,
            //         "gender": "Male",
            //         "idNumber": "",
            //         "idImageurl": "",
            //         "name": "Cayleb Appiah"
            //     },
            //     {
            //         "id": "z6s8S5ySWEY3pHSCdO5OVLgeotD2",
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2Fz6s8S5ySWEY3pHSCdO5OVLgeotD2?alt=media&token=71593e97-c276-4169-804b-966832d3ea93",
            //         "fcmToken": "eM2KzPkJRbaBizh6DnuDEE:APA91bHBvwaGgrxZt_7wgsMJYCXbfCVxqD-6PE-Wrw7rJEM2ak--lyiqIXxyo03jsTNBu7mHjJjosg-qW1Ud_zpd7ZTuokRTi9GJlBFbnn1SpFOV0ql0Oge2O_1OHMH1gr9yZ9nEtBfQ",
            //         "provider": "Email",
            //         "updatedOn": {
            //             "seconds": 1715803351,
            //             "nanoseconds": 215739000
            //         },
            //         "gender": "Male",
            //         "country": "Ghana",
            //         "balance": 0,
            //         "onHold": false,
            //         "idImageurl": "",
            //         "role": "Student",
            //         "email": "lilpkay10@gmail.com",
            //         "subjects": [],
            //         "isComplete": true,
            //         "nationalID": "",
            //         "createdOn": {
            //             "seconds": 1715803094,
            //             "nanoseconds": 23622000
            //         },
            //         "name": "Nana Korankye Oduro ",
            //         "status": true,
            //         "phone": "",
            //         "idNumber": "",
            //         "dateofbirth": {
            //             "seconds": 836092800,
            //             "nanoseconds": 0
            //         }
            //     },
            //     {
            //         "id": "zTUHSrzfA7MLWUliK93sOlMoWQ72",
            //         "email": "essumangsolomon@yahoo.com",
            //         "country": "United States",
            //         "createdOn": {
            //             "seconds": 1712446635,
            //             "nanoseconds": 203955000
            //         },
            //         "subjects": [],
            //         "nationalID": "",
            //         "dateofbirth": {
            //             "seconds": 734068800,
            //             "nanoseconds": 0
            //         },
            //         "balance": 0,
            //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/asapstudyportal.appspot.com/o/profile_images%2FzTUHSrzfA7MLWUliK93sOlMoWQ72?alt=media&token=98186f1a-472c-4d1a-930c-1265ca32cc32",
            //         "status": true,
            //         "idNumber": "",
            //         "name": "Solomon Essumang ",
            //         "isComplete": true,
            //         "gender": "Male",
            //         "fcmToken": "coJUdUDCg00grOxPIFAKmh:APA91bHGJrwizoFQy4XqSLkyLnnvZIAcx3wmtCH5Vo_8HvK23wXX1yvzS0opyooY0xdkJMFY__C5CczG-IwYLlYgS5jcqsk630Qix-iSR8Xb_Hb9cNZqrkodiQUwi8MaSKSsjWW1gKVp",
            //         "idImageurl": "",
            //         "provider": "Email",
            //         "phone": "",
            //         "onHold": false,
            //         "role": "Student",
            //         "updatedOn": {
            //             "seconds": 1715990319,
            //             "nanoseconds": 26249000
            //         }
            //     }
            // ]
            console.log("Student are",this.students);
            /// Make json for Excel
            this.jsonData = this.students.map((obj: any) => {
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


      selectedRow(value:IStudent){
        this.localStorage.set('student',value)
        this.router.navigate(['/admin/students/'+value.id])
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
