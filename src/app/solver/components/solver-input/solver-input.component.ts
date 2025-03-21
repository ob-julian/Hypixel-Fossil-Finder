import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SolverService } from '../../services/solver.service';
import { CellState } from '../../../models/cell-state/cell-state.model';
import { FormsModule } from '@angular/forms';
import { ThemeSwitcherComponent } from "../../../theme/theme-switcher/theme-switcher.component";

@Component({
    selector: 'app-solver-input',
    standalone: true,
    imports: [CommonModule, FormsModule, ThemeSwitcherComponent],
    templateUrl: './solver-input.component.html',
    styleUrl: './solver-input.component.css'
})
export class SolverInputComponent implements OnInit {
    @Input() width: number = 9;
    @Input() height: number = 6;

    data: CellState[][] = [];
    possibleExcavations: number[][] = [];
    private highestExcavation: number[] = [];
    numberOfPossibleExcavations: number = 0;
    showAllFossils: any;
    autoUpdate: boolean = false;

    constructor(private router: Router, private solverService: SolverService) { }

    ngOnInit(): void {
        this.data = Array(this.width).fill(null).map(() => Array(this.height).fill(null));
        this.solverService.getNextExcavation().subscribe(excavation => {
            // remove data from known tiles
            for (let i = 0; i < excavation.length; i++) {
                for (let j = 0; j < excavation[i].length; j++) {
                    if (this.data[i][j] !== null) {
                        excavation[i][j] = 0;
                    }
                }
            }

            this.possibleExcavations = excavation;
            // find tiles to be highlighted
            this.highestExcavation = [Math.max(...this.possibleExcavations.flat())];
            // if no excavation is possible, dont show all tiles as possible
            this.highestExcavation = this.highestExcavation.filter(val => val > 0); // deprecated with new solver but still needed if data was cleared
            this.numberOfPossibleExcavations = this.possibleExcavations.flat().filter(val => this.highestExcavation.includes(val)).length;
            const dataCells: number = this.data.flat().filter(cell => cell === true).length;
            this.numberOfPossibleExcavations -= dataCells; // remove obvious excavations
        });
        this.autoUpdate = (typeof localStorage !== 'undefined') ? localStorage.getItem('autoUpdate') === 'true' : false;
        if (this.autoUpdate) {
            this.solve();
        }
    }

    toggleCellState(row: number, col: number): void {
        // hide next excavation
        this.highestExcavation = [];
        switch (this.data[row][col]) {
            case true:
                this.data[row][col] = false;
                break;
            case false:
                this.data[row][col] = null;
                break;
            default:
                this.data[row][col] = true;
        }

        if (this.autoUpdate) {
            this.solve();
        }
    }

    solve(): void {
        this.solverService.solve(this.data);
    }

    clear(): void {
        this.data = Array(this.width).fill(null).map(() => Array(this.height).fill(null));
        this.solverService.reset();
    }

    showFossils(): void {
        this.router.navigate(['/fossils']);
    }

    isPossibleExcavation(row: number, col: number): boolean {
        try {
            return this.highestExcavation.includes(this.possibleExcavations[row][col]);
        } catch (e) {
            return false;
        }
    }

    autoUpdateChanged(): void {
        localStorage.setItem('autoUpdate', this.autoUpdate.toString());
        // trigger update
        if (this.autoUpdate) {
            this.solve();
        }
    }

}
