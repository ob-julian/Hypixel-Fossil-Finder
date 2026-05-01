import { Component } from '@angular/core';
import { SolverInputComponent } from "../solver-input/solver-input.component";
import { SolverResultComponent } from "../solver-result/solver-result.component";

@Component({
    selector: 'app-solver-view',
    imports: [SolverInputComponent, SolverResultComponent],
    templateUrl: './solver-view.component.html',
    styleUrl: './solver-view.component.css'
})
export class SolverViewComponent {
}
