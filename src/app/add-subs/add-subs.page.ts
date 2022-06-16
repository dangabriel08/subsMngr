import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { SubsService } from '../services/subs.service';

@Component({
  selector: 'app-add-subs',
  templateUrl: './add-subs.page.html',
  styleUrls: ['./add-subs.page.scss'],
})
export class AddSubsPage implements OnInit {
  private subsFormData: FormGroup
  private subsFormValue;
  constructor( private subsService:SubsService, private loadingController: LoadingController) { }
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

   addSub(){
    this.subsService.addSubs(3, this.subsFormData.value).subscribe((res)=>{
      console.log(res);
    });
    
  }
}
