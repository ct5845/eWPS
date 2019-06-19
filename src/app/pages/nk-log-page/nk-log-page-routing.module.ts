import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NkLogPageComponent} from './nk-log-page.component';

const routes: Routes = [{
  path: '', component: NkLogPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NkLogPageRoutingModule { }
