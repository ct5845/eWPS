import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrainingSpeedsComponent} from './training-speeds/training-speeds.component';

const routes: Routes = [
    {path: 'training-speeds', component: TrainingSpeedsComponent, data: {toolbarName: 'Training Speeds'}},
    {path: '', redirectTo: 'training-speeds', pathMatch: 'full'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
