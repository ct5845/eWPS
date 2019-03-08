import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';
import {SessionListComponent} from './sessions/session-list/session-list.component';
import {SessionComponent} from './sessions/session/session.component';
import {HomeComponent} from './home/home.component';
import {FirebaseGuard} from './firebase-guard';

const routes: Routes = [
    {path: 'training-speeds', component: TrainingSpeedsComponent, data: {toolbarName: 'Training Speeds'}},
    {path: 'sessions', component: SessionListComponent, data: {toolbarName: 'Sessions'}, canActivate: [FirebaseGuard]},
    {path: 'session/:id', component: SessionComponent, data: {toolbarName: 'Session', back: ['/sessions']}},
    {path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
