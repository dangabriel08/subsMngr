import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { first, last } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private userRegisterFormData: FormGroup;

  constructor(private authService: AuthService, private loadingController:LoadingController, private alertController:AlertController, private router:Router) { }

  ngOnInit() {

    this.userRegisterFormData = new FormGroup({
      'first_name': new FormControl(),
      'last_name': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl(),
      'confirmPassword': new FormControl()
    });
  }
  async registerUser(){

    let registrationErrorMessage =
    "";
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'processing you registration...',
      translucent: true,
      cssClass: '',
      backdropDismiss: true
    });
    // let error_alert = await this.alertController.create({
    //   cssClass: 'my-custom-class',
    //   header: 'Registration Failed',
    //   message: registrationErrorMessage,
    //   buttons: [{
    //     text:"Ok",
    //     handler:()=>{
    //     }
    //   }]
    // });
    const success_alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registration Successful',
      message: 'Redirecting now to the login page. ',
      buttons: [{
        text:"Ok",
        handler:()=>{
          this.router.navigate(['/login'])
        }
      }]
    });
    let first_name = this.userRegisterFormData.value.first_name;
    let last_name = this.userRegisterFormData.value.last_name;
    let email = this.userRegisterFormData.value.email;
    let password = this.userRegisterFormData.value.password;

    this.authService.register(first_name,last_name,email,password).subscribe((res)=>{
      
      if(res.status=='error')
      { 
        console.log ("Registration Error: ", res);

         this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Registration Failed',
          message: res.message,
          buttons: [{
            text:"Ok",
            handler:()=>{
            }
          }]}).then((alert)=>{
            alert.present();
          });
      

      }
      else if( res.status=='success')
      {

        console.log ("Registration Success: ", res);
        success_alert.present();
      }
    })
  }
}
