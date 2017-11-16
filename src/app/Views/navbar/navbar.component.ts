import {Component, OnInit} from '@angular/core';
import {LoginFormComponent} from '../login-form/login-form.component';
import {Browser} from 'selenium-webdriver';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {User} from '../../classes/user.model';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ProductService]
})

export class NavbarComponent implements OnInit {
  user = new User('', '', '', '', false, '');
  savedUser = sessionStorage.getItem('user');
  showEnter = true;
  router: Router;
  constructor(_router: Router) {
    this.router = _router;
  }
  ngOnInit() {
    this.user = JSON.parse(this.savedUser);
    if (this.user != null) {
      this.showEnter = false;
      console.log(this.user);
    }
  }
  leaveSession() {
    sessionStorage.clear();
    window.location.reload();
  }
  editProfile() {
    sessionStorage.setItem('id', this.user._id);
    this.router.navigate(['edit-profile']);
  }
}

