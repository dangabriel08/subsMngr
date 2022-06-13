import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubsService {

  constructor(private http: HttpClient) { }

  getSubs():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.tempAccessToken}`
    });
    
  const requestOptions = { headers: headers };
    return this.http.get(`${environment.getSubsEndpoint}3`,requestOptions)
  }
}
