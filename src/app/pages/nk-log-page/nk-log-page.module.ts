import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NkLogPageRoutingModule } from './nk-log-page-routing.module';
import { NkLogPageComponent } from './nk-log-page.component';

@NgModule({
  declarations: [NkLogPageComponent],
  imports: [
    CommonModule,
    NkLogPageRoutingModule
  ],
  exports: [NkLogPageComponent]
})
export class NkLogPageModule { }
