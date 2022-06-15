import { Component, OnInit } from '@angular/core';
import { SubsService } from '../services/subs.service';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.page.html',
  styleUrls: ['./subs.page.scss'],
})
export class SubsPage implements OnInit {

  constructor(private subsService:SubsService) { }
  subs  = <any>[];
  ngOnInit() {
   this.getSubs();
  }

   getSubs() {
    this.subsService.getSubs().subscribe(res=>{
      this.subs = res;
      console.log(res);
    });
  }
}
