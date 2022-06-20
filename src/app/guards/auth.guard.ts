import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {take, map} from 'rxjs/operators'
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router, private alertController:AlertController)
  {
 
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.loadStoredToken();
  

      this.authService.user.subscribe(user=>{
        if(user)
        {
         
        }
        else
        {
 
          this.alertController.create({
            header:"Unauthorized",
            message:"You are not allowed to access that page. You need to login to continue",
            buttons:["Ok"]
          }).then((alert)=>{
            alert.present();
            this.router.navigate(["/"]);
          })
        }
      })
      return true;
  }
  
}
