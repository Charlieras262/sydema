import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProjectVariable } from '../../variables/project-variables';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  readonly API_URL = new ProjectVariable().serverLocation + 'api/users';

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.API_URL + '/register', user, { headers: headers });
  }

  authRegisterInfo(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.API_URL + '/register/auth', user, { headers: headers });
  }

  authenticateUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.API_URL + '/authenticate', user, { headers: headers });
  }

  valEmail(email) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.API_URL + '/email/' + email, { headers: headers });
  }

  valUserName(username) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.API_URL + '/username/' + username, { headers: headers });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL + '/profile', { headers: headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.user = user;
  }

  loggedAsAdmin() {
    this.loadUser();
    if (this.user) {
      var user = JSON.parse(this.user);
      if (user.type !== "A") {
        return false
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  loggedAsStudent() {
    this.loadUser();
    if (this.user) {
      var user = JSON.parse(this.user);
      if (user.type !== "S") {
        return false
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  getUserById(id) {
    return this.http.get(this.API_URL + '/id/' + id);
  }

  getUserByUsername(username) {
    return this.http.get(this.API_URL + '/user/' + username);
  }

  loggedIn() {
    return !jwtHelper.isTokenExpired(localStorage.getItem('id_token'));
  }
}
