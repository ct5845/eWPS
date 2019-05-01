import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AnglePlot, AnglePlotCompare} from '../angle-plot';
import {AnglePlotService} from '../angle-plot.service';
import moment from 'moment';

@Component({
    selector: 'app-angle-plot-compare',
    templateUrl: './angle-plot-compare.component.html',
    styleUrls: ['./angle-plot-compare.component.scss']
})
export class AnglePlotCompareComponent implements OnInit {
    public $comparePlot: Observable<AnglePlotCompare>;

    public showData = true;

    public plotData: any;
    public plotLayout = {
        showlegend: true,
        xaxis: {
            title: 'Oar Angle',
            zeroline: false
        }
    };

    constructor(private plotService: AnglePlotService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.$comparePlot = this.route.params
            .pipe(
                switchMap(params => this.plotService.find(params.id)));
    }

    public createPlot(plot: AnglePlotCompare) {
        this.plotData = [{x: plot.target.toBoxPlot(), type: 'box', name: 'Target', hoverinfo: 'text'}, ...plot.plots.map(p => {
            return {x: p.toBoxPlot(), type: 'box', name: p.name, hoverinfo: 'text'};
        })];

        this.showData = false;
    }

    public save(plot: AnglePlotCompare) {
        if (!plot.date) {
            plot.date = moment().toISOString();
        }

        this.plotService.save(plot);
    }

    public delete(plot: AnglePlotCompare) {
        this.plotService.delete(plot);
    }

    public addPlot(plot: AnglePlotCompare) {
        plot.plots.push(new AnglePlot());
    }

    public deletePlot(comparePlot: AnglePlotCompare, plot: AnglePlot) {
        comparePlot.plots.splice(comparePlot.plots.findIndex(p => p.id === plot.id), 1);
    }

    public dropPlot($event: any, comparePlot: AnglePlotCompare) {
        const from = $event.previousIndex;
        const to   = $event.currentIndex;

        const tempTo            = comparePlot.plots[to];
        comparePlot.plots[to]   = comparePlot.plots[from];
        comparePlot.plots[from] = tempTo;
    }
}
