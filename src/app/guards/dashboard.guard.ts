import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const adminData = localStorage.getItem('admin');

        // Check if adminData exists and is valid JSON
        if (adminData) {
            try {
                const parsedData = JSON.parse(adminData);

                // Check if email is present in the parsed data
                if (parsedData && parsedData.email) {
                    return true;
                }
            } catch (err) {
                console.error('Error parsing admin data:', err);
            }
        }

        // Redirect to login if not authenticated
        this.router.navigateByUrl('/login');
        return false;
    }
}
