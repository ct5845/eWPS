import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AnglePlotCompare} from '../angle-plot';
import {AnglePlotService} from '../angle-plot.service';

@Component({
    selector: 'app-angle-plot-compare',
    templateUrl: './angle-plot-compare.component.html',
    styleUrls: [ './angle-plot-compare.component.scss' ]
})
export class AnglePlotCompareComponent implements OnInit {
    public $comparePlot: Observable<AnglePlotCompare>;

    constructor(private plotService: AnglePlotService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.$comparePlot = this.route.params
            .pipe(
                switchMap(params => this.plotService.find(params.id)));
    }
}
