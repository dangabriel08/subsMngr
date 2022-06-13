import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSubsPage } from './add-subs.page';

const routes: Routes = [
  {
    path: '',
    component: AddSubsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSubsPageRoutingModule {}
