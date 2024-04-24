import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserResponse } from '../classes/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  async create(data: any) {
    try {
      return this.httpClient
        .post<UserResponse>(`${environment.API_URL}/createUser`, data)
        .toPromise()
        .then((res) => {
          return res;
        });
    } catch (error) {
      throw error;
    }
  }

  async updateParticipante(data: any) {
    try {
      return this.httpClient
        .post<UserResponse>(
          `${environment.API_URL}/participante/updateParticipante`,
          data
        )
        .toPromise()
        .then((res) => {
          return res;
        });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: any) {
    try {
      return this.httpClient
        .delete<UserResponse>(`${environment.API_URL}/deleteUser/${id}`, id)
        .toPromise()
        .then((res) => {
          return res;
        });
    } catch (error) {
      throw error;
    }
  }
}
