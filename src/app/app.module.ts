import {DragDropModule} from '@angular/cdk/drag-drop';
import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AgGridModule} from 'ag-grid-angular';
import {PlotlyModule} from 'angular-plotly.js';
import {MomentModule} from 'ngx-moment';
import {PapaParseModule} from 'ngx-papaparse';
import {environment} from '../environments/environment';
import {ButtonRendererComponent} from './ag-grid/button-renderer/button-renderer.component';
import {AnglePlotCompareComponent} from './angle-plot/angle-plot-compare/angle-plot-compare.component';
import {AnglePlotListComponent} from './angle-plot/angle-plot-list/angle-plot-list.component';
import {AnglePlotComponent} from './angle-plot/angle-plot.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {DurationInputComponent} from './duration-input/duration-input.component';
import {DurationPipe} from './duration/duration.pipe';
import {HomeComponent} from './home/home.component';
import {MetricsComponent} from './metrics/metrics.component';
import {PieceAnalysisListComponent} from './piece-analysis/piece-analysis-list/piece-analysis-list.component';
import {PieceAnalysisComponent} from './piece-analysis/piece-analysis.component';
import {PieceListComponent} from './piece/piece-list/piece-list.component';
import {SessionDetailsComponent} from './sessions/session-details/session-details.component';
import {SessionListComponent} from './sessions/session-list/session-list.component';
import {ForceCurveComponent} from './sessions/session/force-curve/force-curve.component';
import {MetricAveragesComponent} from './sessions/session/metric-averages/metric-averages.component';
import {SessionOverviewComponent} from './sessions/session/session-overview/session-overview.component';
import {SessionComponent} from './sessions/session/session.component';
import {TelemetryComponent} from './telemetry/telemetry.component';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';

export const DATE_DISPLAY = 'ddd Do, MMMM YYYY';

const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: DATE_DISPLAY,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: DATE_DISPLAY,
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

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
        MetricAveragesComponent,
        AnglePlotComponent,
        HomeComponent,
        SessionDetailsComponent,
        ButtonRendererComponent,
        MetricsComponent,
        AnglePlotListComponent,
        AnglePlotCompareComponent,
        PieceAnalysisListComponent,
        PieceAnalysisComponent,
        PieceListComponent,
        TelemetryComponent
    ],
    entryComponents: [
        DeleteDialogComponent
    ],
    imports: [
        BrowserModule,
        AgGridModule.withComponents([ ButtonRendererComponent ]),
        AppRoutingModule,
        MatToolbarModule,
        MatListModule,
        MatCheckboxModule,
        MatRadioModule,
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
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        LayoutModule,
        MatSidenavModule,
        MatIconModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule.enablePersistence(),
        AngularFireAuthModule,
        AngularFireStorageModule,
        // AngularFireDatabaseModule,
        PapaParseModule,
        MatButtonToggleModule,
        PlotlyModule,
        HttpClientModule,
        MomentModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatMomentDateModule,
        DragDropModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500}},
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
