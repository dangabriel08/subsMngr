import { Component, OnInit } from '@angular/core';
import { SubsService } from '../services/subs.service';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.page.html',
  styleUrls: ['./subs.page.scss'],
})
export class SubsPage implements OnInit {

  constructor(private subsService:SubsService) { }

  ngOnInit() {
    this.subsService.getSubs().subscribe(res=>{
      console.log(res);
    });
  }

}
