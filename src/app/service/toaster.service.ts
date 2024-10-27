import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2'

export interface IToaster{
  title?:string;
  message?:string;
  type?:'success'| 'error' | 'warning';
  autoClose?:boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  private toast = new BehaviorSubject<IToaster>({ autoClose: false });
  showToast = this.toast.asObservable();

  toasterConfig = {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: HTMLElement) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  }

  constructor() {}

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })

  showToaster(message: string, type: 'warning' | 'success' | 'error' | 'info') {
    return this.Toast.fire({
      text:message,
      icon: type,
    })
  }

  showHideToast(value: IToaster) {
    this.toast.next(value);
  }



}
