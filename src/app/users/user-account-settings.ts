import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { LocalStorageService } from '../service/localstorage.service';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
@Component({
    moduleId: module.id,
    templateUrl: './user-account-settings.html',
})
export class UserAccountSettingsComponent implements OnInit {
    constructor(private userService: UsersService, private localStore: LocalStorageService) {}
    adminData!: any;
    signedUserData!: any;
    ngOnInit(): void {
        this.loadData();
    }

    acountDataForm: any = new FormGroup({
        name: new FormControl('', Validators.required),
        currentPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', Validators.required),
        adminEmail: new FormControl('', Validators.required),
        adminPassword: new FormControl('', Validators.required),
        toDeleteAccountEmail: new FormControl('', Validators.required),
        paymentSecret: new FormControl('', Validators.required),
        newPaymentSecret: new FormControl('', Validators.required),
    });

    async updateUserPassword() {
        try {
            // Check if current and new passwords are provided
            

            // Check if the current password matches the stored password
            if (this.acountDataForm.value.currentPassword === this.adminData[0].password) {
                // Update the password securely
                await this.userService.updateAdminProfile(this.adminData[0].id, {
                    password: this.acountDataForm.value.newPassword,
                });
                alert('Password updated successfully.');
                this.acountDataForm.reset()
            } else {
                alert('Current password is incorrect.');
            }
        } catch (error) {
            console.error('Error updating password:', error); // Log the error for debugging
            alert('Could not update password. Please try again later.');
        }
    }

    updatePaymentSecret() {
        try {
            if (
                this.acountDataForm.value.paymentSecret &&
                this.acountDataForm.value.paymentSecret &&
                this.acountDataForm.value.paymentSecret === this.adminData[0]?.secret
            ) {
                this.userService.updateAdminProfile(this.adminData[0].id, {
                    secrete: this.acountDataForm.value.newPaymentSecret,
                });
                alert('Secrete Updated');
            } else if (this.adminData[0].secrete == undefined) {
                this.userService.updateAdminProfile(this.adminData[0].id, {
                    secrete: this.acountDataForm.value.newPaymentSecret,
                });
                alert('Secrete Updated');
            }
        } catch {
            alert('Could not update secrete');
        }
    }

    addNewAdmin() {
        let newEmail = this.acountDataForm.value.adminEmail;
        let newPassword = this.acountDataForm.value.adminPassword;
        try {
            let data = {
                email: newEmail,
                password: newPassword,
                role: 'admin',
            };
            if (newEmail && newPassword) {
                this.userService.createDocument('admin', data);
                alert('admin added');
                this.acountDataForm.reset();
            }
        } catch {}
    }

    async deleteAdmin() {
        let deletedMail = this.acountDataForm.value.toDeleteAccountEmail;

        try {
            let user: any = await this.userService.getUserAdmin(deletedMail);
            console.log('user', user);
            if (!user) {
                alert('user not found');
                return;
            }
            if (user[0].role === 'admin') {
                this.userService.removeDocument('admin', user[0].id);
                alert('user deleted');
            }
            this.acountDataForm.reset();
        } catch {
            alert('Could not delete user');
        }
    }

    async loadData() {
        this.signedUserData = await this.localStore.get('admin');
        if (this.signedUserData !== null) {
            this.adminData = await this.userService.getUserAdmin(this.signedUserData.email);
            console.log(this.adminData);
        }
    }
}
