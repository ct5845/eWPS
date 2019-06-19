import {DragDropModule} from '@angular/cdk/drag-drop';
import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AgGridModule} from 'ag-grid-angular';
import {PlotlyModule} from 'angular-plotly.js';
import {MomentModule} from 'ngx-moment';
import {PapaParseModule} from 'ngx-papaparse';
import {environment} from '../environments/environment';
import {ButtonRendererComponent} from './legacy/ag-grid/button-renderer/button-renderer.component';
import {AnglePlotCompareComponent} from './legacy/angle-plot/angle-plot-compare/angle-plot-compare.component';
import {AnglePlotListComponent} from './legacy/angle-plot/angle-plot-list/angle-plot-list.component';
import {AnglePlotComponent} from './legacy/angle-plot/angle-plot.component';

import {AppRoutingModule} from './legacy/app-routing.module';
import {AppComponent} from './app.component';
import {DeleteDialogComponent} from './legacy/delete-dialog/delete-dialog.component';
import {DurationInputComponent} from './legacy/duration-input/duration-input.component';
import {DurationPipe} from './legacy/duration/duration.pipe';
import {HomeComponent} from './legacy/home/home.component';
import {MetricsComponent} from './legacy/metrics/metrics.component';
import {PieceAnalysisListComponent} from './legacy/piece-analysis/piece-analysis-list/piece-analysis-list.component';
import {PieceAnalysisComponent} from './legacy/piece-analysis/piece-analysis.component';
import {PieceListComponent} from './legacy/piece/piece-list/piece-list.component';
import {SessionDetailsComponent} from './legacy/sessions/session-details/session-details.component';
import {SessionListComponent} from './legacy/sessions/session-list/session-list.component';
import {ForceCurveComponent} from './legacy/sessions/session/force-curve/force-curve.component';
import {MetricAveragesComponent} from './legacy/sessions/session/metric-averages/metric-averages.component';
import {SessionOverviewComponent} from './legacy/sessions/session/session-overview/session-overview.component';
import {SessionComponent} from './legacy/sessions/session/session.component';
import {TelemetryComponent} from './legacy/telemetry/telemetry.component';
import {TrainingSpeedsComponent} from './legacy/training-speeds/training-speeds.component';

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
