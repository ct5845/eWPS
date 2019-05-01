import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import moment from 'moment';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AnglePlot, AnglePlotCompare} from '../angle-plot';
import {targetLine} from '../angle-plot.component';
import {AnglePlotService} from '../angle-plot.service';

@Component({
    selector: 'app-angle-plot-compare',
    templateUrl: './angle-plot-compare.component.html',
    styleUrls: [ './angle-plot-compare.component.scss' ]
})
export class AnglePlotCompareComponent implements OnInit {
    public $comparePlot: Observable<AnglePlotCompare>;

    public showData = true;

    public plotData: any;
    public plotLayout = {
        showlegend: true,
        xaxis: {
            title: 'Oar Angle',
            zeroline: false,
            showgrid: false
        },
        yaxis: {
            showgrid: false
        },
        shapes: []
    };

    public alignedTo: string;

    constructor(private plotService: AnglePlotService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.$comparePlot = this.route.params
            .pipe(
                switchMap(params => this.plotService.find(params.id)));
    }

    public createPlot(plot: AnglePlotCompare, align?: string) {
        this.alignedTo = align;

        const target = {x: plot.target.boxPlot, type: 'box', name: 'Target'};
        const average = plot.plots.length > 1 ? {x: plot.average.alignedBoxPlot(plot.target, align), type: 'box', name: 'Average'} : {};
        const data = plot.plots.map(p => {
            return {x: p.alignedBoxPlot(plot.target, align), type: 'box', name: p.name};
        }).reverse();

        this.plotData = [ ...data, average, target ];

        this.plotLayout.shapes = plot.target.targetLine.map(x => targetLine(x));

        this.plotLayout.shapes.push({
            xref: 'paper',
            yref: 'y',
            x0: 0,
            x1: 1,
            y0: plot.plots.length - 0.5,
            y1: plot.plots.length + 1.5,
            type: 'rect',
            fillcolor: '#d3d3d3',
            line: {
                width: 0
            },
            opacity: 0.4,
            layer: 'below'
        });

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
        const to = $event.currentIndex;

        const tempTo = comparePlot.plots[ to ];
        comparePlot.plots[ to ] = comparePlot.plots[ from ];
        comparePlot.plots[ from ] = tempTo;
    }
}
