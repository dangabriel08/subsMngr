import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SubsService } from '../services/subs.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-edit-subs',
  templateUrl: './edit-subs.page.html',
  styleUrls: ['./edit-subs.page.scss'],
})
export class EditSubsPage implements OnInit {

  private subsOptions:any;
  private paymentMethods:any;
  private subsDetails:any;
  private subsFormData: FormGroup;
  private authInfo: any;
  item: any;

  constructor(private subsService:SubsService, private loadingController: LoadingController, public alertController: AlertController,private router: Router, private route: ActivatedRoute,private storage:Storage) { }

  ngOnInit() {
    this.subsOptions = this.subsService.getSubsOptions();
    this.paymentMethods = this.subsService.getPaymentMethods();

    this.subsFormData = new FormGroup({
      'subs_name': new FormControl(),
      'subs_price': new FormControl(),
      'billing_date': new FormControl(),
      'payment_method_used': new FormControl(),
      'payment_method_type':new FormControl()
    });

    this.route.queryParamMap.subscribe((params)=>{
      this.subsDetails = params;
      this.subsFormData.patchValue({
      'subs_name': params.get('subs_name'),
      'subs_price': params.get('subs_price'),
      'billing_date':params.get('billing_date'),
      'payment_method_used': params.get('payment_method_used'),
      'payment_method_type':params.get('payment_method_type'),

      });
      console.table(this.subsDetails);
    
    });
    
  }

  async editSub()
  {

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
      message: 'Subscription has been udpated',
      buttons: [{
        text:"okay",
        handler:()=>{
          this.router.navigate(["/subs"]);
        }
      }]
    });
    await loading.present();
    this.authInfo = await this.storage.get("authInfo");
    this.subsService.editSubs(this.subsDetails.get('id'), this.subsFormData.value, this.authInfo ).subscribe((res)=>
    { 
      
      loading.dismiss().then(()=>
      {
        alert.present();
      });
      console.log(res);
    });
    console.table(this.subsFormData.value);
  }

}
