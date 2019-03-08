import {AngularFireModule} from '@angular/fire';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatStepperModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DurationInputComponent} from './duration-input/duration-input.component';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';
import {LayoutModule} from '@angular/cdk/layout';
import {DurationPipe} from './duration/duration.pipe';
import {SessionComponent} from './sessions/session/session.component';
import {PapaParseModule} from 'ngx-papaparse';
import {PlotlyModule, PlotlyViaCDNModule} from 'angular-plotly.js';
import {SessionListComponent} from './sessions/session-list/session-list.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {ForceCurveComponent} from './sessions/session/force-curve/force-curve.component';
import {AgGridModule} from 'ag-grid-angular';
import {SessionOverviewComponent} from './sessions/session/session-overview/session-overview.component';
import {TimeSeriesComponent} from './sessions/session/time-series/time-series.component';
import {MetricAveragesComponent} from './sessions/session/metric-averages/metric-averages.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AnglePlotComponent } from './angle-plot/angle-plot.component';
import { HomeComponent } from './home/home.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'ngx-moment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';

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
        MetricAveragesComponent,
        AnglePlotComponent,
        HomeComponent
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
        MatTableModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        LayoutModule,
        MatSidenavModule,
        MatIconModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        // AngularFireDatabaseModule,
        PapaParseModule,
        MatButtonToggleModule,
        PlotlyModule,
        HttpClientModule,
        MomentModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
