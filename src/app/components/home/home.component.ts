import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  usersList: any;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    await this.commonService.getUsers().then((response: any) => {
      this.usersList = response.data;
    });
  }

  async delete(id: string) {
    await this.userService.deleteUser(id).then((response) => {
      response;
      this.getUsers();
    });
  }
}
