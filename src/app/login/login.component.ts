import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/User';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('userForm') userForm: any;
  username: string;
  password: string;
  loginAttempt: boolean;
  message: string;


  constructor(private loginService: LoginService, private newsService: NewsService) { 
    this.username = "";
    this.password = "";
    this.message = "";
    this.loginAttempt = false;
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginAttempt = true;
    this.loginService.login(this.username, this.password).subscribe(userReturned =>
    {
      this.newsService.setUserApiKey(userReturned.apikey);
      this.clear();
    },
    error => {
      Swal.fire({
      icon: 'error',
      title: 'Wrong Credentials',
      text: 'Username or Password are incorrect!',
      footer: 'Please try again.'
    })
    }
  )}

  onLogout(): void {
    this.loginService.logout();
    this.newsService.setAnonymousApiKey();
    sessionStorage.removeItem('currentUser');
    this.clear();
  }

  clear(): void {
    this.userForm.reset();
  }

  isLogged(): boolean {
    return this.loginService.isLogged();
  }

  getUser(): User | null {
    return this.loginService.getUser();
  }

}
