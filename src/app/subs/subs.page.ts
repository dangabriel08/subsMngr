import { Component, OnInit } from '@angular/core';
import { subsObject,subs, SubsService } from '../services/subs.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-subs',
  templateUrl: './subs.page.html',
  styleUrls: ['./subs.page.scss'],
})
export class SubsPage implements OnInit {

  constructor(private subsService:SubsService, private loadingController: LoadingController) { }
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
      this.subs = [...this.subs, ...res.results];
    });
  }
}
