import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/User';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('userForm') userForm: any;

  user?: User | null;
  username: string;
  password: string;

  constructor(private loginService: LoginService) { 
    this.user = null;
    this.username = "";
    this.password = "";

  }

  ngOnInit(): void {
  }

  onLogin():void {
    console.log("On login");
    this.loginService.login(this.username, this.password).subscribe(userReturned => this.user = userReturned);
  }

  onLogout():void {
    this.loginService.logout()
    this.clear();
  }

  clear(): void {
    this.userForm.reset();
    this.username = "";
    this.password = "";
  }



  isLogged(): boolean{
    console.log(this.loginService.isLogged());
    return this.loginService.isLogged();
  }

}
