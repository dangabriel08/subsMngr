import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubsPageRoutingModule } from './subs-routing.module';

import { SubsPage } from './subs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubsPageRoutingModule
  ],
  declarations: [SubsPage]
})
export class SubsPageModule {}
