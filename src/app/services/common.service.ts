import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
// import { LocalService } from './local.service';

interface generalResponse {
  data: any;
  error: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router // private localService: LocalService
  ) {}

  async getUsers() {
    try {
      return this.httpClient
        .get<generalResponse>(`${environment.API_URL}/users`)
        .toPromise()
        .then((res) => {
          return res;
        });
    } catch (error) {
      throw error;
    }
  }
}
