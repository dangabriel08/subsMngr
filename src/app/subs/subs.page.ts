import { Component, OnInit } from '@angular/core';
import { subsObject,subs, SubsService } from '../services/subs.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import {Storage} from '@ionic/storage-angular';
@Component({
  selector: 'app-subs',
  templateUrl: './subs.page.html',
  styleUrls: ['./subs.page.scss'],
})
export class SubsPage implements OnInit {
  private authInfo = null;
  constructor(private subsService:SubsService, private loadingController: LoadingController, private alertController:AlertController,public router: Router, private storage:Storage ){ }
  subs  = <any>[];
  async ngOnInit() {
    this.authInfo = await this.storage.get("authInfo");

  if(this.authInfo != null)
  {
    this.getSubs();
  }

  }

  async getSubs() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'loading subs...',
      translucent: true,
      cssClass: '',
      backdropDismiss: true
    });

    await loading.present();
    this.authInfo = await this.storage.get("authInfo");
    await this.subsService.getSubs(3,this.authInfo).subscribe(res=>{
     
      loading.dismiss();
      console.log(res);
      this.subs = res.results;
    });
  }

  async deleteSubs(subs_name,id){

    const deleteSuccessAlert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'The subscription has been deleted',
      buttons: [{
        text:"Okay",
        handler:()=>{
        }
        
      }]
    });
    this.authInfo = await this.storage.get("authInfo");
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Do you want continue deleted ' + subs_name + " subscription on the list?",
      buttons: [{
        text:"Delete",
        cssClass:"danger",
        handler:()=>{

          this.subsService.deleteSubs(id,this.authInfo).subscribe(res=>{  
              this.getSubs().then(()=>{});
          });
       
        }
        
      },{
        text:"Cancel",
        handler:()=>{
        },
        
      }]
    });

    await alert.present();
  }

  editSubs(id,sub){
    const params:NavigationExtras = {
      queryParams: sub
    };
    this.router.navigate([`edit-subs/${id}`],params);
  }
}
