import { Injectable } from '@angular/core';
import { Asignation } from 'src/app/models/asignation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ProjectVariable } from 'src/app/variables/project-variables';

@Injectable({
  providedIn: 'root'
})
export class AsignationService {

  selectedAsignation: Asignation;
  asignations: Asignation[];

  readonly API_URL = new ProjectVariable().serverLocation+'api/asignations';

  constructor(private http: HttpClient, private auth: AuthService) { 
    this.selectedAsignation = new Asignation();
  }

  getAsignations() {
    this.auth.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.auth.authToken);
    return this.http.get(this.API_URL, {headers: headers});
  }

  authAsignationInfo(asignation) {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get(this.API_URL + '/auth/' + JSON.stringify(asignation), {headers: headers});
  }

  postAsignation(asignation: Asignation) {
    let headers = new HttpHeaders().set('Content-type', "application/json");
    return this.http.post(this.API_URL, asignation, {headers: headers});
  }

  addAsignation(asignation) {
    let headers = new HttpHeaders().set('Content-type', "application/json");
    return this.http.put(this.API_URL + `/add/${JSON.stringify(asignation)}`, asignation);
  }

  delAsignation(asignation) {
    return this.http.put(this.API_URL + `/del/${JSON.stringify(asignation)}`, asignation);
  }

  deleteAsignation(_id: string) {
    return this.http.delete(this.API_URL + `/${_id}`);
  }
}
