import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../classes/user.model';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css'],
  providers: [UserService],
})
export class TableUsersComponent implements OnInit {
  users = new User('', '', '', '', false, '', '');
  @Input()
  public alerts: Array<IAlert> = [];
  private _success = new Subject<string>();
  private backup: Array<IAlert>;
  constructor(private userService: UserService, private router: Router) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  user: any;
  error: string;
  id: string; name: string; mail: string;
  index: number;
  data: any;
  ngOnInit() {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data;
        console.log(data);
      });
  }
  showUsers() {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data;
        console.log(data);
      });
  }
  passIndex(id: string, name: string, i: number) {
    this.users._id = id;
    this.users.name = name;
    this.index = i;
  }
  deleteUsers(id: string) {
    this.users._id = id;
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log(data);
        this.user.splice(this.index, 1);
      });
  }
  passID(id: string, name: string, mail: string) {
    this.id = id;
    this.name = name;
    this.mail = mail;
  }

  modifyUsers(name: string, email: string, password: string) {
    this.users.email = email;
    this.users.name = name;
    this.users.password = password;
    this.users._id = this.id;
    console.log(this.users);
    this.userService.modifyUser(this.users).subscribe(
      (data) => {
        console.log(data);
        this.error = data.name;
          this.alerts.pop();
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Usuario modificado!',
          });
      }, (err) => {
        console.log(err);
        this.alerts.pop();
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'No se ha podido modificar el usuario!',
        });
      });
  }
  changeAdmin(id: string, name: string, email: string, admin: boolean) {
    this.users.email = email;
    this.users.name = name;
    this.users._id = id;
    if (admin) {
      this.users.admin = false;
    }else {
      this.users.admin = true;
    }

    console.log(this.users);
    this.userService.modifyUser(this.users).subscribe(
      (data) => {
        console.log(data);
        this.error = data.name;
        this.user = data;
      });
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  sortByName() {
    this.userService.getUser().subscribe(
      (data) => {

        this.data = data.sort();
        this.data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.user = this.data;
        console.log(data);
        console.log(this.user);
      });
  }
  sortByEmail() {
    this.userService.getUser().subscribe(
      (data) => {

        this.data = data.sort();
        this.data.sort(function (a, b) {
          if (a.email > b.email) {
            return 1;
          }
          if (a.email < b.email) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.user = this.data;
        console.log(data);
        console.log(this.user);
      });
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
