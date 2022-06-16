import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SubsService } from '../services/subs.service';

@Component({
  selector: 'app-add-subs',
  templateUrl: './add-subs.page.html',
  styleUrls: ['./add-subs.page.scss'],
})
export class AddSubsPage implements OnInit {
  private subsFormData: FormGroup
  private subsFormValue;
  constructor( private subsService:SubsService, private loadingController: LoadingController, public alertController: AlertController,private router: Router) { }
  subsOptions = ["Netflix","Hulu", "Amazon Prime","Disney", "HBO" ];
  paymentMethods = ["Credit Card", "Paypal"];

  ngOnInit() {

    this.subsFormData = new FormGroup({
      'subs_name': new FormControl(),
      'subs_price': new FormControl(),
      'billing_date': new FormControl(),
      'payment_method_used': new FormControl(),
      'payment_method_type':new FormControl()
    });

  }

  async addSub(){
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'loading subs...',
      translucent: true,
      cssClass: '',
      backdropDismiss: true
    });
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Subscription has been Added',
      buttons: [{
        text:"okay",
        handler:()=>{
          this.router.navigate(["/subs"]);
        }
      }]
    });
    await loading.present();

    this.subsService.addSubs(3, this.subsFormData.value).subscribe((res)=>{
  
      loading.dismiss().then(()=>
      {
        alert.present();
      });
      console.log(res);
    });
    
  }
}
