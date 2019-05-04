import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatCheckboxChange, MatSelectionList, MatSelectionListChange, MatSnackBar} from '@angular/material';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, pluck, take} from 'rxjs/operators';
import {Session} from '../../sessions/session';
import {SessionService} from '../../sessions/session.service';
import {Piece} from '../piece';

@Component({
    selector: 'app-piece-list',
    templateUrl: './piece-list.component.html',
    styleUrls: ['./piece-list.component.scss']
})
export class PieceListComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public $session: Observable<Session>;

    @Output() public changed = new EventEmitter<Session>();

    public $pieces: Observable<Piece[]>;
    public $sessions: Observable<Map<string, Map<string, Session[]>>>;
    public $selectedPieces = new BehaviorSubject<Piece[]>([]);

    public $disableMerge: Observable<boolean>;
    public $disableDelete: Observable<boolean>;

    @ViewChild(MatSelectionList) public pieceList: MatSelectionList;

    public $checkAllChecked: Observable<boolean>;
    public $checkAllIndeterminate: Observable<boolean>;

    public appView = 'metrics';

    constructor(private sessionService: SessionService,
                private toast: MatSnackBar) {
    }

    ngOnInit() {
        if (this.$session) {
            this.$pieces = this.$session.pipe(
                pluck('pieces'),
                map(pieces => {
                    return pieces.sort((a, b) => a.start - b.start);
                }));
        } else {
            this.$sessions = this.sessionService.getByDayAndGroup();
        }

        this.$disableMerge = this.$selectedPieces.pipe(map(pieces => pieces.length < 2));

        this.$disableDelete = this.$selectedPieces.pipe(map(pieces => pieces.length === 0));

        this.$checkAllChecked = combineLatest(this.$selectedPieces, this.$pieces)
            .pipe(map(values => values[0].length === values[1].length));

        this.$checkAllIndeterminate = combineLatest(this.$selectedPieces, this.$pieces)
            .pipe(map(values => values[0].length > 0 && values[0].length !== values[1].length));
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (!!this.$pieces) {
                this.$pieces.pipe(take(1))
                    .subscribe(() => {
                        this.pieceList.selectAll();
                        this.onSelectionChanged();
                    });
            }
        });
    }

    ngOnDestroy(): void {
    }

    onSelectionChanged($event?: MatSelectionListChange) {
        const selectedOptions = !!$event ? $event.source.selectedOptions : this.pieceList.selectedOptions;

        this.$selectedPieces.next(selectedOptions.selected.map(s => s.value));
    }

    onCheckAllChanged($event: MatCheckboxChange) {
        if ($event.checked) {
            this.pieceList.selectAll();
        } else {
            this.pieceList.deselectAll();
        }

        this.onSelectionChanged();
    }

    deleteSelected() {
        combineLatest(this.$session, this.$selectedPieces)
            .pipe(take(1))
            .subscribe(values => {
                const session: Session = values[0];
                const pieces: Piece[]  = values[1];

                pieces.forEach(piece => {
                    session.pieces.splice(session.pieces.findIndex(p => p.id === piece.id), 1);
                });

                this.sessionService.update(session).then(() => {
                    this.onSelectionChanged();
                    this.toast.open('Pieces deleted');
                });
            });
    }

    public compareKeys(a: any, b: any) {
        return a.key > b.key ? -1 : 1;
    }

    public addPieceFromSession($event: MatCheckboxChange, piece: Piece) {
        const currentlySelected = this.$selectedPieces.getValue();

        if ($event.checked) {
            currentlySelected.push(piece);
        } else {
            currentlySelected.splice(currentlySelected.findIndex(p => p.id === piece.id), 1);
        }

        this.$selectedPieces.next(currentlySelected);
    }
}
