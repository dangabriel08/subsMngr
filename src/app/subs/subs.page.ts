import { Component, OnInit } from '@angular/core';
import { subsObject,subs, SubsService } from '../services/subs.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subs',
  templateUrl: './subs.page.html',
  styleUrls: ['./subs.page.scss'],
})
export class SubsPage implements OnInit {

  constructor(private subsService:SubsService, private loadingController: LoadingController, private alertController:AlertController,public router: Router) { }
  subs  = <any>[];
  ngOnInit() {
  this.getSubs();
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

    this.subsService.getSubs(3).subscribe(res=>{
     
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
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Do you want continue deleted ' + subs_name + " subscription on the list?",
      buttons: [{
        text:"Delete",
        cssClass:"danger",
        handler:()=>{

          this.subsService.deleteSubs(id).subscribe(res=>{  
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
    console.table(id,sub);
    this.router.navigate([`edit-subs/${id}`],{state:{sub}});
  }
}
