import { Inject, inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../service/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private router:Router){}
   @Inject(LocalStorageService)storage:any;
   userEmail!:string;
   
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let admin = localStorage.getItem('admin')
      if (admin === null) {
        this.router.navigateByUrl('/login')
        return false
      }
      return true;
  }
  
}
