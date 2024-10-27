import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IToaster } from 'src/app/service/toaster.service';

@Component({
  selector: 'app-custom-toaster',
  templateUrl: './custom-toaster.component.html',
})
export class CustomToasterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() toastConfig!: IToaster;
  @Input() showToast: boolean = false;
  @Output() closeToastEvent = new EventEmitter();


  closeToast(){
    this.closeToastEvent.emit(true);
  }

}
