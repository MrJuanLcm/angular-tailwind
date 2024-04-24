import { Injectable } from '@angular/core';
import { ToastrComponent } from './toastr.component';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
  private toastrComponent!: ToastrComponent;

  setToastrComponent(toastrComponent: ToastrComponent) {
    this.toastrComponent = toastrComponent;
  }

  showSuccess(message: string) {
    this.toastrComponent.message = message
    this.toastrComponent?.showSuccess();
  }

  showError(message: string) {
    this.toastrComponent.message = message
    this.toastrComponent?.showError();
  }

  showInfo(message: string) {
    this.toastrComponent.message = message
    this.toastrComponent.showInfo();
  }

  showWarning(message: string) {
    this.toastrComponent.message = message
    this.toastrComponent.showWarning();
  }
}