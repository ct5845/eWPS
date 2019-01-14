import {Component} from '@angular/core';
import {BoatTypes} from '../shared/boat-types';

const defaultColors = [
    '#FFD700',
    '#C0C0C0',
    '#cd7f32'
];

const defaultConfig = {
    race: {
        distance: 2000,
        boatType: null,
        rate: 36,
        targets: [
            { seconds: 400, colour: defaultColors[0] }
        ]
    }
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public boatTypes = BoatTypes;
    public defaultColors = defaultColors;

    public config = defaultConfig;
}
