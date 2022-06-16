import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSubsPageRoutingModule } from './add-subs-routing.module';

import { AddSubsPage } from './add-subs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSubsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddSubsPage]
})
export class AddSubsPageModule {}
