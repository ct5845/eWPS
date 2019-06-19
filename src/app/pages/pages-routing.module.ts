import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule), pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)},
    {path: 'nk-log', loadChildren: () => import('./nk-log-page/nk-log-page.module').then(m => m.NkLogPageModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
