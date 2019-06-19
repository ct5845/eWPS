import {Component, OnInit, ChangeDetectionStrategy, Input, HostBinding, OnDestroy} from '@angular/core';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {distinctUntilChanged} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'rt-icon-header',
    templateUrl: './icon-header.component.html',
    styleUrls: ['./icon-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconHeaderComponent implements OnInit, OnDestroy {
    @Input() public backLink: string;
    @Input() public showLogin: boolean;
    @Input() public $collapseHeader: Observable<boolean>;

    @HostBinding('attr.small') @Input() public small: boolean;
    @HostBinding('attr.collapse') @Input() public collapse: boolean;

    constructor() {
    }

    ngOnInit() {
        if (!!this.$collapseHeader) {
            this.$collapseHeader.pipe(
                distinctUntilChanged(),
                untilComponentDestroyed(this))
                .subscribe(value => {
                    this.collapse = value || null;
                });
        }
    }

    ngOnDestroy(): void {
    }
}
