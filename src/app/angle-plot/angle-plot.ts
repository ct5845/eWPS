import {randomString} from '../../shared/random-string';

export class AnglePlotCompare {
    public id: string;
    public name: string;
    public date: string;

    public target: AnglePlot  = new AnglePlot();
    public plots: AnglePlot[] = [];

    constructor(id?: string) {
        if (id) {
            this.id = id;
        }
    }

    get average(): AnglePlot {
        if (this.plots && this.plots.length > 1) {
            return this.plots.reduce((prev, next) => prev.add(next),
                new AnglePlot()).multiply(1 / this.plots.length);
        } else {
            return null;
        }
    }

    static fromDb(plot: any): AnglePlotCompare {
        const obj = Object.assign(new AnglePlotCompare(), plot);

        obj.target = Object.assign(new AnglePlot(), plot.target);

        obj.plots = plot.plots.map(p => Object.assign(new AnglePlot(), p));

        return obj;
    }
}

export class AnglePlot {
    public id: string = randomString();
    public name: string;
    public catch      = 0;
    public load       = 0;
    public peak       = 0;
    public unload     = 0;
    public finish     = 0;
    public work       = 0;

    public spread: number;
    public inboard: number;
    public length: number;
    public lineOfWork: number;

    get boxPlot(): number[] {
        return [
            this.catch,
            this.catch + this.load,
            this.catch + this.load,
            this.peak,
            this.finish - this.unload,
            this.finish - this.unload,
            this.finish
        ];
    }

    get targetLine(): number[] {
        return [
            this.catch,
            this.catch + this.load,
            this.peak,
            this.finish - this.unload,
            this.finish
        ];
    }

    get total(): number {
        return -1 * this.catch + this.finish;
    }

    get effective(): number {
        return this.total - this.load - this.unload;
    }

    add(anglePlot: AnglePlot): AnglePlot {
        this.catch += anglePlot.catch;
        this.load += anglePlot.load;
        this.peak += anglePlot.peak;
        this.unload += anglePlot.unload;
        this.finish += anglePlot.finish;
        this.work += anglePlot.work;

        return this;
    }

    multiply(ratio: number): AnglePlot {
        this.catch *= ratio;
        this.load *= ratio;
        this.peak *= ratio;
        this.unload *= ratio;
        this.finish *= ratio;
        this.work *= ratio;

        return this;
    }

    alignedBoxPlot(target: AnglePlot, alignTo?: string):  number[] {
        const boxPlot = this.boxPlot;

        if (!alignTo) {
            return boxPlot;
        } else {
            const alignBy = target[alignTo] - this[alignTo];

            return boxPlot.map(x => x + alignBy);
        }
    }
}
