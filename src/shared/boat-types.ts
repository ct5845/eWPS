const boatSizeConstants = {
    '1': {
        c1: 3.8889E-08,
        c2: 3.3633E-06,
        d1: 1.1580E-05,
        d2: -2.0087E-05,
        e1: -1.9521E-03,
        e2: -2.5263E-02
    },
    '2': {
        c1: 6.0000E-08,
        c2: 3.3494E-06,
        d1: 1.3067E-06,
        d2: -6.9057E-05,
        e1: -1.6818E-03,
        e2: -2.0964E-02
    },
    '4': {
        c1: 1.1611E-07,
        c2: 3.6703E-06,
        d1: -5.6500E-06,
        d2: -8.7662E-05,
        e1: -1.2835E-03,
        e2: -2.1906E-02
    },
    '8': {
        c1: 5.9722E-08,
        c2: 3.1131E-06,
        d1: -7.9983E-06,
        d2: -8.9085E-05,
        e1: -1.3770E-03,
        e2: -1.7287E-02
    }
};

export class BoatType {
    constructor(public name: string) {
    }

    speedMultiplier(windSpeed: number, windDirection: number): number {
        windSpeed *= -1;

        const q1 = boatSizeConstants[ this.name ].c1 * Math.pow(windDirection, 2) +
            (boatSizeConstants[ this.name ].d1 * windDirection) + boatSizeConstants[ this.name ].e1;

        const q2 = boatSizeConstants[ this.name ].c2 * Math.pow(windDirection, 2) +
            (boatSizeConstants[ this.name ].d2 * windDirection) + boatSizeConstants[ this.name ].e2;

        return (q1 * Math.pow(windSpeed, 2)) + (q2 * windSpeed);
    }
}

export const BoatTypes = [
    new BoatType('1'),
    new BoatType('2'),
    new BoatType('4'),
    new BoatType('8')
];
