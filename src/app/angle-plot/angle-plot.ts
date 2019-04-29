export class AnglePlotCompare {
    public id: string;
    public name: string;
    public date: string;

    public target: AnglePlot;
    public plots: AnglePlot[];

    get average(): AnglePlot {
        if (this.plots && this.plots.length > 1) {
            return this.plots.reduce((prev, next) => prev.add(next), new AnglePlot()).multiply(this.plots.length);
        } else {
            return null;
        }
    }

    static fromDb(plot: any): AnglePlotCompare {
        const obj = Object.assign(new AnglePlotCompare(), plot);

        obj.plots = plot.plots.map(p => Object.assign(new AnglePlot(), p));

        return obj;
    }
}

export class AnglePlot {
    public catch: number;
    public load: number;
    public peak: number;
    public unload: number;
    public finish: number;
    public work: number;

    public spread: number;
    public inboard: number;
    public length: number;
    public lineOfWork: number;

    toBoxPlot(): number[] {
        return [
            this.catch,
            this.catch + this.load,
            this.peak,
            this.finish - this.unload,
            this.finish
        ];
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
}
