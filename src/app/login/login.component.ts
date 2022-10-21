import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/User';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('userForm') userForm: any;
  username: string;
  password: string;


  constructor(private loginService: LoginService, private newsService: NewsService) { 
    this.username = "";
    this.password = "";

  }

  ngOnInit(): void {
  }

  onLogin(): void {
    console.log("On login");
    this.loginService.login(this.username, this.password).subscribe(userReturned => {
      this.newsService.setUserApiKey(userReturned.apikey);
    })
  }

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
