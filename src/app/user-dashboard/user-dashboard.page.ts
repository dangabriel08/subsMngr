import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import {Storage} from '@ionic/storage-angular';
import {from } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})


export class UserDashboardPage implements OnInit {

  private userInfo:any;

  constructor( private loadingController: LoadingController, private alertController:AlertController,public router: Router, private storage:Storage , private authService:AuthService) { }

  async ngOnInit() {
    await this.authService.loadStoredToken();
    this.getUserInfo();
  }

  getUserInfo()
  {
    let userObj = from ( this.storage.get('userInfo'));
    userObj.subscribe((userInfo)=>{
      this.userInfo = userInfo[0];
      console.log("userInfo in user-dashboard");
      console.table(this.userInfo);
    });

  }
}
