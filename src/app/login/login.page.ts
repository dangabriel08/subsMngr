import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import {from} from 'rxjs/';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private userLoginFormData: FormGroup;

  constructor(private authService: AuthService, private subsService:AuthService, private loadingController:LoadingController, private alertController:AlertController, private router:Router) { }

  ngOnInit() {
    this.userLoginFormData = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    });

  }

  async loginUser(){

    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'logging you in...',
      translucent: true,
      cssClass: '',
      backdropDismiss: true
    });
    const error_alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Login Failed',
      message: 'The email or Password is incorrect.',
      buttons: [{
        text:"Ok",
        handler:()=>{
        }
      }]
    });
    const success_alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Login Successful',
      message: 'Redirecting now to the dashboard',
      buttons: [{
        text:"Ok",
        handler:()=>{
          
        }
      }]
    });
    await loading.present();

    this.authService.login(this.userLoginFormData.value.email,this.userLoginFormData.value.password).subscribe((res) =>{
      if(res.status == "success")
      {
        let loading = from (this.loadingController.dismiss());
        loading.subscribe(()=>{
          success_alert.present();
          this.router.navigate(["/subs"]);
        });
    
      }
      else if (res.status == "error")
      {
        loading.dismiss();
        error_alert.present();
       
      }
      console.log("Login Status:" , res.status);
   
    });
  }
}
