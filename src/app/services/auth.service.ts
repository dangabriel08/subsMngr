import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {take,map,switchMap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Storage} from '@ionic/storage-angular';

const TOKEN_KEY = '';
export interface AuthInfo {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface authObject {
  status: string;
  auth_info: AuthInfo;
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  public user : Observable<any>;
  public userData = new BehaviorSubject(null);
  
  constructor(private http: HttpClient, private storage: Storage, private platform:Platform, private router: Router) 
  {

  }

  loadStoredToken()
  {
    let platformObs = from(this.platform.ready());
    this.user = platformObs.pipe(
      switchMap(()=>{
        return from(this.storage.get('TOKEN_KEY'));
      }),
      map(token=>{
       console.log("Token from Storage: " + token);

       if(token)
       {
        return true;
       }
       else{
        return false;
       }
      })
    )
    return false;
  }

  login(email, password){

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${environment.tempAccessToken}`
      
    });
   
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password',password);
 
  const requestOptions = { headers: headers };
    return this.http.post<authObject>(`${environment.authEndpoint}/login`, params.toString() ,requestOptions)
  }

}
