import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatCardModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatListModule, MatSelectModule,
    MatToolbarModule
} from '@angular/material';
import {MccColorPickerModule} from 'material-community-components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DurationInputComponent } from './duration-input/duration-input.component';

@NgModule({
    declarations: [
        AppComponent,
        DurationInputComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MccColorPickerModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
