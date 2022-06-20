import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import { Observable ,from , forkJoin} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
export interface subs{
  id: number;
  user_id: number;
  subs_name: string;
  billing_date: string;
  subs_price:number;
  payment_method_used: string;
  payment_method_type: string;
  created_at: Date;
  updated_at: Date;
}
export interface subsObject {
  status: string;
  results: subsObject[];
}
@Injectable({
  providedIn: 'root'
})

export class SubsService {
  private TOKEN_KEY = '';
  private _storage : Storage | null = null;

  constructor(private http: HttpClient,private storage:Storage, private authService: AuthService) 
  { 
    this.init();
  } 
  
      async init()
      {
        const storage = await this.storage.create();
        this._storage = storage;
      }
      getSubsOptions (){
        let subsOptions:any;
        subsOptions = ["Netflix","Hulu", "Amazon Prime","Disney", "HBO" ];
        return subsOptions;
      }

      getPaymentMethods()
      {
        let paymentMethods:any;
        paymentMethods = ["Credit Card", "Paypal", "Google Play" , "Apple Pay"];
        return paymentMethods;
      }
// Get Subs
      getSubs(user_id,authInfo):Observable<subsObject>{
       
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${authInfo.access_token}`
        }); 
   
        const requestOptions = { headers: headers };

        return this.http.get<subsObject>(`${environment.getSubsEndpoint}/${user_id}`,requestOptions).pipe()


      }



// addSubs
      addSubs(user_id, formValue, authInfo):Observable<any>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${authInfo.access_token}`
          
        });
        console.log(formValue)
        let params = new URLSearchParams();
        params.append('subs_name', formValue.subs_name);
        params.append('subs_price',formValue.subs_price);
        params.append('billing_date',formValue.billing_date);
        params.append('payment_method_type',formValue.payment_method_type);
        params.append('payment_method_used',formValue.payment_method_used);
     
      const requestOptions = { headers: headers };
        return this.http.post(`${environment.getSubsEndpoint}/${user_id}`, params.toString() ,requestOptions)
      }

// Delete Subs

      deleteSubs(id,auth_info){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_info.access_token}`
        });
        
      const requestOptions = { headers: headers };
        return this.http.delete<subsObject>(`${environment.getSubsEndpoint}/${id}`,requestOptions)
      }

      // editSubs
      editSubs(user_id, formValue, authInfo):Observable<any>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${authInfo.access_token}`
          
        });
        console.log(formValue)
        let params = new URLSearchParams();
        params.append('subs_name', formValue.subs_name);
        params.append('subs_price',formValue.subs_price);
        params.append('billing_date',formValue.billing_date);
        params.append('payment_method_type',formValue.payment_method_type);
        params.append('payment_method_used',formValue.payment_method_used);
     
      const requestOptions = { headers: headers };
        return this.http.put(`${environment.getSubsEndpoint}/${user_id}`, params.toString() ,requestOptions)
      }

}
