import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  constructor(private http: HttpClient) { }

      getSubs(user_id):Observable<subsObject>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.tempAccessToken}`
        });
        
      const requestOptions = { headers: headers };
        return this.http.get<subsObject>(`${environment.getSubsEndpoint}/${user_id}`,requestOptions)
      }

      addSubs(user_id, formValue):Observable<any>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${environment.tempAccessToken}`
          
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

}
