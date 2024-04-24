import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService extends ErrorHandler {
  constructor() {
    super();
  }

  override handleError(error: any) {
    console.error(error);
    super.handleError(error);
  }
}
