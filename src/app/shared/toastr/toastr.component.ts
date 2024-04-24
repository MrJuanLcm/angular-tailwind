import { Component, Input, ViewChild  } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent{
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer!: ToastContainerDirective;
  
  @Input() message: string = ""; 

  constructor(
    private toastr: ToastrService,
    ) {
      this.toastr.overlayContainer = this.toastContainer; 
    }
  
  showSuccess() {
    this.toastr.success(this.message);
  }

  showError() {
    this.toastr.error(this.message);
  }

  showInfo() {
    this.toastr.info(this.message);
  }

  showWarning(){
    this.toastr.warning(this.message);
  }
}