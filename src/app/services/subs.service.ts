import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface subsObject {
  id: number;
  user_id: number;
  subs_name: string;
  billing_date: string;
  payment_method_used: string;
  payment_method_type: string;
  created_at: Date;
  updated_at: Date;
}
@Injectable({
  providedIn: 'root'
})

export class SubsService {

  constructor(private http: HttpClient) { }

  getSubs():Observable<subsObject>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.tempAccessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.get<subsObject>(`${environment.getSubsEndpoint}3`,requestOptions)
  }
}
