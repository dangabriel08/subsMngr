import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) 
  {

  }

  getSubs(user_id):Observable<any>{
    return this.http.get(`${environment.getSubsEndpoint}/3`)
  }
}