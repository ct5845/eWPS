import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';
import {SessionListComponent} from './sessions/session-list/session-list.component';
import {SessionComponent} from './sessions/session/session.component';

const routes: Routes = [
    {path: 'training-speeds', component: TrainingSpeedsComponent, data: {toolbarName: 'Training Speeds'}},
    {path: 'sessions', component: SessionListComponent, data: {toolbarName: 'Oarlock Sessions'}},
    {path: 'session/:id', component: SessionComponent, data: {toolbarName: 'Oarlock Session', back: ['/sessions']}},
    {path: '', redirectTo: 'training-speeds', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
