import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AnglePlotCompareComponent} from './angle-plot/angle-plot-compare/angle-plot-compare.component';
import {AnglePlotListComponent} from './angle-plot/angle-plot-list/angle-plot-list.component';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';
import {SessionListComponent} from './sessions/session-list/session-list.component';
import {SessionComponent} from './sessions/session/session.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
    {path: 'training-speeds', component: TrainingSpeedsComponent, data: {toolbarName: 'Training Speeds'}},
    {path: 'sessions', component: SessionListComponent, data: {toolbarName: 'Sessions'}},
    {path: 'session/:id', component: SessionComponent, data: {toolbarName: 'Session', back: ['/sessions']}},
    {path: 'angle-plots', component: AnglePlotListComponent, data: {toolbarName: 'Angle Plots'}},
    {path: 'angle-plots/:id', component: AnglePlotCompareComponent, data: {toolbarName: 'Angle Plot - Compare', back: ['/angle-plot']}},
    {path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
