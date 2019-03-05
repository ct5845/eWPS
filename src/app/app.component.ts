import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
    public pageTitle = '';
    public back: any[];

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.router.events
            .pipe(filter(event => event instanceof RoutesRecognized))
            .subscribe((event: RoutesRecognized) => {
                this.pageTitle = event.state.root.firstChild.data.toolbarName;
                this.back = event.state.root.firstChild.data.back;
            });
    }
}
