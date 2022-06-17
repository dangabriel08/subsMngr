import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSubsPageRoutingModule } from './edit-subs-routing.module';

import { EditSubsPage } from './edit-subs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSubsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditSubsPage]
})
export class EditSubsPageModule {}
