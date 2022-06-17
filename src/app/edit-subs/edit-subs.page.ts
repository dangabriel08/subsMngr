import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SubsService } from '../services/subs.service';

@Component({
  selector: 'app-edit-subs',
  templateUrl: './edit-subs.page.html',
  styleUrls: ['./edit-subs.page.scss'],
})
export class EditSubsPage implements OnInit {

  private subsFormData: FormGroup;
  item: any;

  constructor(private subsService:SubsService, private loadingController: LoadingController, public alertController: AlertController,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(_p =>{
    const navParams = this.router.getCurrentNavigation().extras.state;
    if ( navParams) this.item = navParams.item;
    console.log(this.item);
    });

    this.subsFormData = new FormGroup({
      'subs_name': new FormControl(),
      'subs_price': new FormControl(),
      'billing_date': new FormControl(),
      'payment_method_used': new FormControl(),
      'payment_method_type':new FormControl()
    });

  }

}
