import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ColoredFossil } from '../../../models/colored-fossil/colored-fossil.model';
import { FossilViewComponent } from '../../../common/component/fossil-view/fossil-view.component';
import { SolverService } from '../../services/solver.service';

@Component({
    selector: 'app-solver-result',
    standalone: true,
    imports: [FossilViewComponent, CommonModule, ScrollingModule],
    templateUrl: './solver-result.component.html',
    styleUrl: './solver-result.component.css'
})
export class SolverResultComponent implements OnInit {
    possibleFossils: Array<[ColoredFossil, number]> = [];
    message: string = '';

    hasRun: boolean = false; // for visual purposes
    totalSubFossils: number = 0;
    private _skip: boolean = false;

    constructor(private solverService: SolverService) { }

    ngOnInit(): void {
        this.solverService.getPossibleFossils().subscribe(fossils => {
            this.possibleFossils = fossils;
            this.totalSubFossils = fossils.reduce((acc, [fossil, xTimes]) => acc + xTimes, 0);
            if (this._skip) {
                this.hasRun = true;
            } else {
                this._skip = true;
            }
        });
        this.solverService.getMessage().subscribe(message => {
            this.message = message;
            this.hasRun = false;
        });
    }

    trackByFossil(index: number, fossil: [ColoredFossil, number]) {
        return fossil[0].id; // Assuming 'id' is unique
    }
    
}