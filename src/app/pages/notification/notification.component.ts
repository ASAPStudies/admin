import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';
import { IStudent, ITutor } from '../students/student.interface';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
    notificationTemplates: any[] = [];
    selectedNotificationTemplates: any;
    isLoading: boolean = false;
    isDeleteLoading: boolean = false;
    search: string = '';

    // constructor
    constructor(private userService: UsersService, private router: Router, private sharedService: SharedService) {}
    cols = [
        { field: 'id', title: 'Template ID' },
        { field: 'name', title: 'Template Name' },
        { field: 'title', title: 'Notification Title' },
        { field: 'body', title: 'Notification Body' },
        { field: 'createdOn', title: 'Push Date' },
        { field: 'action', title: 'Action' },
    ];

    ngOnInit() {
        this.getNotificationTemplates();
    }

    async getNotificationTemplates() {
        try {
            this.isLoading = true;
            this.notificationTemplates = await this.sharedService.getNotificationTemplates();
            console.log(this.notificationTemplates);

            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error('Error loading notification templates:', error);
        }
    }

    async deleteTemplate(value: any) {
        this.isDeleteLoading = true;
        this.selectedNotificationTemplates = value;
        let result = await this.sharedService.deleteNotificationTemplates('notification_templates', value.id);
        if (result) {
            this.notificationTemplates = this.notificationTemplates.filter((res) => res.id != value.id);
        }
        this.isDeleteLoading = false;
    }

    resendNotification(value: any) {
        this.notificationForm.setValue({ title: value.title, body: value.body, templateName: '' });
    }

    ///
    form_submission: boolean = false;
    isSuccess: boolean = false;
    submitLoading: boolean = false;
    isSaveTemplate: boolean = false;

    selectedRole: string = '';
    tutors: ITutor[] = [];
    students: IStudent[] = [];
    selectedStudents: IStudent[] = [];
    selectedTutors: ITutor[] = [];
    fetchUserLoading: boolean = false;
    shouldBroadCast: boolean = false;

    notificationForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        body: new FormControl('', [Validators.required]),
        templateName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });

    onRadioChange(event: any) {
        this.selectedRole = event.target.value;
        this.getAllUsers(this.selectedRole);
    }

    onChecked(event: any) {
        this.shouldBroadCast = event.target.checked;
    }

    onStudentSelection(event: any) {
        this.selectedStudents = event;
    }
    onTutorSelection(event: any) {
        this.selectedTutors = event;
    }

    async getAllUsers(role: string = '') {
        this.fetchUserLoading = true;
        try {
            switch (role) {
                case 'all': {
                    this.students = await this.userService.getUsers('Student');
                    this.tutors = await this.userService.getUsers('Tutor');
                    break;
                }

                case 'Student': {
                    this.students = await this.userService.getUsers('Student');
                    break;
                }

                case 'Tutor': {
                    this.tutors = await this.userService.getUsers('Tutor');
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.fetchUserLoading = false;
        }
    }

    onIsSaveTemplateChange(event: any) {
        this.isSaveTemplate = false;
        this.notificationForm.controls['templateName'].disable();
        if (event.target.checked) {
            this.notificationForm.controls['templateName'].enable();
            this.isSaveTemplate = true;
        }
    }

    async onSubmit() {
        this.submitLoading = true;

        const { title, body, templateName } = this.notificationForm.value as { title: string; body: string; templateName: string };
        switch (this.selectedRole) {
            case 'all': {
                if (this.shouldBroadCast) {
                    this.selectedTutors = this.tutors;
                    this.selectedStudents = this.students;
                }

                for (const element of this.selectedStudents) {
                    await this.sharedService.sendNotification({ title, body, token: element.fcmToken });
                    await this.userService.createDocumentChildCollection('users', element.id, 'notifications', {
                        subject: title,
                        description: body,
                        isRead: false,
                        createdOn: new Date(),
                    });
                }
                for (const element of this.selectedTutors) {
                    await this.sharedService.sendNotification({ title, body, token: element.fcmToken });
                    await this.userService.createDocumentChildCollection('users', element.id, 'notifications', {
                        subject: title,
                        description: body,
                        isRead: false,
                        createdOn: new Date(),
                    });
                }

                break;
            }

            case 'Student': {
                if (this.shouldBroadCast) {
                    this.selectedStudents = this.students;
                }
                for (const element of this.selectedStudents) {
                    await this.sharedService.sendNotification({ title, body, token: element.fcmToken });
                    await this.userService.createDocumentChildCollection('users', element.id, 'notifications', {
                        subject: title,
                        description: body,
                        isRead: false,
                        createdOn: new Date(),
                    });
                }
                break;
            }

            case 'Tutor': {
                if (this.shouldBroadCast) {
                    this.selectedTutors = this.tutors;
                }
                for (const element of this.selectedTutors) {
                    await this.sharedService.sendNotification({ title, body, token: element.fcmToken });
                    await this.userService.createDocumentChildCollection('users', element.id, 'notifications', {
                        subject: title,
                        description: body,
                        isRead: false,
                        createdOn: new Date(),
                    });
                }
                break;
            }
        }

        if (this.isSaveTemplate) {
            await this.userService.createDocument('notification_templates', { name: templateName, createdOn: new Date(), title, body });
            await this.getNotificationTemplates();
        }

        this.isSuccess = true;
        this.form_submission = false;
        this.submitLoading = false;
        this.selectedStudents = [];
        this.selectedTutors = [];
        this.selectedRole = '';
        this.isSaveTemplate = false;
        this.notificationForm.reset();

        setTimeout(() => {
            this.isSuccess = false;
        }, 3000);
    }
}
