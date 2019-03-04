import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Institution } from 'src/app/models/institution';
import { AuthService } from '../auth/auth.service';
import { ProjectVariable } from 'src/app/variables/project-variables';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  selectedCareer: Institution;
  careers: Institution[];

  readonly API_URL = new ProjectVariable().serverLocation+'api/careers';

  constructor(private http: HttpClient, private auth: AuthService) { 
    this.selectedCareer = new Institution();
  }

  getCareers() {
    this.auth.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.auth.authToken);
    return this.http.get(this.API_URL, {headers: headers});
  }

  postCareer(career: Institution) {
    let headers = new HttpHeaders().set('Content-type', "application/json");
    return this.http.post(this.API_URL, career, {headers: headers});
  }

  putCareer(career: Institution) {
    return this.http.put(this.API_URL + `/${career._id}`, career);
  }

  deleteCareer(_id: string) {
    return this.http.delete(this.API_URL + `/${_id}`);
  }

  authCareerInfo(career: Institution){
    return this.http.get(this.API_URL + `/auth/${JSON.stringify(career)}`);
  }
}
