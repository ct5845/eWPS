import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../session.service';
import {Session} from '../session';
import {Observable, ReplaySubject, combineLatest, BehaviorSubject, Subscription} from 'rxjs';
import {Piece} from '../../piece/piece';
import {MatDialog, MatSelectionListChange, MatSnackBar} from '@angular/material';
import {
    map,
    mergeMap,
    take,
    shareReplay,
    pluck
} from 'rxjs/operators';

import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {FormControl} from '@angular/forms';
import {Stroke} from '../../strokes/stroke';
import {DecimalPipe} from '@angular/common';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {SessionOverviewComponent} from './session-overview/session-overview.component';

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnDestroy {
    public sessionObservable: Observable<Session>;
    public strokes: Observable<Stroke[]>;
    public pieces: Observable<Piece[]>;
    public selectedPieces: Observable<Piece[]>;
    public selectedPiecePlaceholder: Observable<string>;
    public name: string;
    public sessionOverviewPiece = new ReplaySubject<Piece>(1);

    public selectedTab          = new FormControl(0);
    public selectedPieceControl = new FormControl();

    private numberPipe = new DecimalPipe('en-GB');

    private selectedPieceIds = new BehaviorSubject<string[]>([]);
    private _session: Session;

    private _getSessionSubscription: Subscription;
    @ViewChild(SessionOverviewComponent) sessionOverview: SessionOverviewComponent;

    constructor(private route: ActivatedRoute,
                private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private changeRef: ChangeDetectorRef,
                private sessionService: SessionService) {
    }

    ngOnInit() {
        this.sessionObservable = this.route.params.pipe(
            pluck('id'),
            mergeMap(id => this.sessionService.find(id).pipe(untilComponentDestroyed(this))),
            shareReplay(1)
        );

        this.strokes = this.sessionObservable.pipe(pluck('strokes'), shareReplay(1));
        this.pieces  = this.sessionObservable.pipe(pluck('pieces'), shareReplay(1));

        this.selectedPieces = combineLatest(this.pieces,
            this.selectedPieceIds).pipe(map(values => {
            const pieces = values[0];
            const ids    = values[1];

            return pieces.filter(piece => ids.indexOf(piece.id) > -1);
        }));

        this._getSessionSubscription = this.sessionObservable
            .pipe(untilComponentDestroyed(this))
            .subscribe(session => {
                this._session = session;
                this.name     = session.name;
            });

        this.selectedPiecePlaceholder = this.sessionOverviewPiece.pipe(
            map(piece => this.getPlaceholderName(piece)));
    }

    ngOnDestroy() {
    }

    updateName() {
        this._session.name = this.name;
        this.sessionService.update(this._session);
    }

    savePiece() {
        combineLatest(this.sessionObservable, this.sessionOverviewPiece)
            .pipe(take(1))
            .subscribe((values) => {
                const session = values[0];
                const piece   = values[1];

                piece.name = this.selectedPieceControl.value ? this.selectedPieceControl.value : this.getPlaceholderName(piece);
                this.selectedPieceControl.setValue(null);

                session.pieces.push(piece);

                this.sessionService.update(session);
            });
    }

    updatePiece(piece: Piece) {
        if (!piece.name || piece.name.length === 0) {
            this.deletePiece(piece, true);
        } else {
            this.sessionObservable
                .pipe(take(1))
                .subscribe(session => {
                    session.pieces.find(p => p.id === piece.id).name = piece.name;

                    this.sessionService.update(session);
                });
        }
    }

    deletePiece(piece: Piece, reset?: boolean) {
        this.sessionObservable
            .pipe(take(1))
            .subscribe(session => {
                const dialog = this.dialog.open(DeleteDialogComponent);

                dialog.afterClosed()
                    .subscribe(closed => {
                        if (closed === true) {
                            session.pieces.splice(session.pieces.findIndex(p => p.id === piece.id), 1);

                            this.sessionService.update(session);
                        } else if (reset) {
                            piece.name = this.getPlaceholderName(piece);
                            this.updatePiece(piece);
                        }
                    });
            });
    }

    viewPieceInOverview(piece: Piece) {
        if (!!this.sessionOverview) {
            this.sessionOverview.putRangeIntoView(piece.start, piece.end);
        }
    }

    pieceSelection(change: MatSelectionListChange) {
        this.selectedPieceIds.next(change.source.selectedOptions.selected.map(option => option.value.id));
    }

    private getPlaceholderName(piece: Piece) {
        return `${this.numberPipe.transform(piece.distance, '1.0-0')}m @ r${this.numberPipe.transform(piece.averages.rate, '1.0-0')}`;
    }
}
