import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
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
    MatStepperModule, MatButtonModule, MatSidenavModule, MatIconModule, MatSlideToggleModule, MatTableModule
} from '@angular/material';
import {MccColorPickerModule} from 'material-community-components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DurationInputComponent} from './duration-input/duration-input.component';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';
import {LayoutModule} from '@angular/cdk/layout';
import { DurationPipe } from './duration/duration.pipe';
import { SessionsComponent } from './sessions/sessions.component';

@NgModule({
    declarations: [
        AppComponent,
        DurationInputComponent,
        TrainingSpeedsComponent,
        DurationPipe,
        SessionsComponent
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
        MatSlideToggleModule,
        MccColorPickerModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
