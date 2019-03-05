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
    MatStepperModule, MatButtonModule, MatSidenavModule, MatIconModule, MatSlideToggleModule, MatTableModule, MatTreeModule,
    MatButtonToggleModule, MatDialogModule, MatSnackBarModule, MatTabsModule, MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';
import {MccColorPickerModule} from 'material-community-components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DurationInputComponent} from './duration-input/duration-input.component';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';
import {LayoutModule} from '@angular/cdk/layout';
import {DurationPipe} from './duration/duration.pipe';
import {SessionComponent} from './sessions/session/session.component';
import {PapaParseModule} from 'ngx-papaparse';
import {PlotlyModule} from 'angular-plotly.js';
import {SessionListComponent} from './sessions/session-list/session-list.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {ForceCurveComponent} from './sessions/session/force-curve/force-curve.component';
import { AgGridModule } from 'ag-grid-angular';
import { SessionOverviewComponent } from './sessions/session/session-overview/session-overview.component';
import { TimeSeriesComponent } from './sessions/session/time-series/time-series.component';
import { MetricAveragesComponent } from './sessions/session/metric-averages/metric-averages.component';

@NgModule({
    declarations: [
        AppComponent,
        DurationInputComponent,
        TrainingSpeedsComponent,
        DurationPipe,
        SessionComponent,
        SessionListComponent,
        DeleteDialogComponent,
        ForceCurveComponent,
        SessionOverviewComponent,
        TimeSeriesComponent,
        MetricAveragesComponent
    ],
    entryComponents: [
        DeleteDialogComponent
    ],
    imports: [
        BrowserModule,
        AgGridModule.withComponents([]),
        AppRoutingModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatTabsModule,
        MatFormFieldModule,
        MatStepperModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MccColorPickerModule,
        MatTableModule,
        MatTreeModule,
        MatDialogModule,
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
        AngularFireDatabaseModule,
        PapaParseModule,
        MatButtonToggleModule,
        PlotlyModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
