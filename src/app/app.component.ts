import {Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import iconList from '../assets/icon-list.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private iconRegistry: MatIconRegistry,
                private sanitizer: DomSanitizer) {
        iconList.icons.forEach(icon => {
            iconRegistry.addSvgIcon(icon.replace('.svg', '').substring(4),
                sanitizer.bypassSecurityTrustResourceUrl(`assets/${icon}`));
        });
    }

    ngOnInit() {

    }
}
