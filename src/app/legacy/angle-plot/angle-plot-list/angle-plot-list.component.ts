import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as shortid from 'shortid';
import {AnglePlotCompare} from '../angle-plot';
import {AnglePlotService} from '../angle-plot.service';

@Component({
    selector: 'app-angle-plot-list',
    templateUrl: './angle-plot-list.component.html',
    styleUrls: ['./angle-plot-list.component.scss']
})
export class AnglePlotListComponent implements OnInit {
    public $plots: Observable<AnglePlotCompare[]>;

    constructor(private anglePlotService: AnglePlotService,
                private router: Router) {
    }

    ngOnInit() {
        this.$plots = this.anglePlotService.get();
    }

    addPlot() {
        this.router.navigate(['angle-plots', shortid.generate()]);
    }

    goTo(plot: AnglePlotCompare) {
        this.router.navigate(['angle-plots', plot.id]);
    }
}
