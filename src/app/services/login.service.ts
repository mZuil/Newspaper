import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private user: User | null;

  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';

  private message: string;

  // private httpOptions = {
  //   headers: new HttpHeaders()
  //     .set('Content-Type', 'x-www-form-urlencoded')
  // };

  constructor(private http: HttpClient) {
    this.message = "";
    this.user = null;
  }

  // Set the corresponding APIKEY accordig to the received by email
  //private APIKEY?: string;
  private APIKEY = 'ANON06_339';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'apikey=' + this.APIKEY
    })
  };

  // Modifies the APIKEY with the received value
  setUserApiKey(apikey: string) {
    this.APIKEY = apikey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'apikey=' + this.APIKEY
      })
    };
    console.log('Apikey successfully changed ' + this.APIKEY);
  }

  setAnonymousApiKey() {
    this.setUserApiKey(this.APIKEY);
  }

  isLogged() {
    return this.user != null;
  }

  login(name: string, pwd: string): Observable<User> {
    const usereq = new HttpParams()
      .set('username', name)
      .set('passwd', pwd);

      console.log("On login", name, pwd)

    return this.http.post<User>(this.loginUrl, usereq).pipe(
      tap(user => {
        this.user = user;
        console.log(this.user, user)
      })
    );
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.user = null;
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`Login failed`);
      window.alert("Login failed");

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
