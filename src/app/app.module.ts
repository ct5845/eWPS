import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatCardModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatListModule, MatSelectModule,
    MatToolbarModule,
    MatStepperModule, MatButtonModule, MatSidenavModule, MatIconModule
} from '@angular/material';
import {MccColorPickerModule} from 'material-community-components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DurationInputComponent} from './duration-input/duration-input.component';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
    declarations: [
        AppComponent,
        DurationInputComponent,
        TrainingSpeedsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        MatSelectModule,
        MccColorPickerModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
