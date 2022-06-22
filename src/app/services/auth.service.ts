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
  message?:string;
  auth_info: AuthInfo;
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  public user:Observable<any>;
  public userData = new BehaviorSubject(null);
  private _storage: Storage | null = null;

   constructor(private http: HttpClient, private storage: Storage, private platform:Platform, private router: Router) 
  {
    this.init();
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.loadStoredToken();

  }
  // loadStorage()
  // {
  //   return this._storage;
  // }
    loadStoredToken()
  {
    console.log("authInfo - from auth service " , this.storage.get('authInfo'));
    this.user =  from(this.storage.get('authInfo'));
  }

  login(email, password){

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
      
    });
   
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password',password);
 
  const requestOptions = { headers: headers };
    return this.http.post<authObject>(`${environment.authEndpoint}/login`, params.toString() ,requestOptions).pipe(
      take(1),
      map((res)=>{
        let storageObs = from (this.storage.set('authInfo', res.auth_info));
        storageObs.subscribe((res)=>{
          console.log("storageObs", res);
          console.log("storage authInfo",this.storage.get('authInfo'));

        })
        return res;
      })
    );
  }

  register(first_name,last_name,email,password){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
      
    });
    let params = new URLSearchParams();
    params.append('first_name', first_name);
    params.append('last_name', last_name);
    params.append('email', email);
    params.append('password',password);
    const requestOptions = { headers: headers };
    return this.http.post<authObject>(`${environment.authEndpoint}/register` ,  params.toString(),requestOptions)
 
   
  }

}
