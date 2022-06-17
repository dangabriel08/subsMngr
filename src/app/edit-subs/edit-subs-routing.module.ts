import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSubsPage } from './edit-subs.page';

const routes: Routes = [
  {
    path: '',
    component: EditSubsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSubsPageRoutingModule {}
