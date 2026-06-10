import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SolverInputComponent } from "../solver-input/solver-input.component";
import { SolverResultComponent } from "../solver-result/solver-result.component";

@Component({
    selector: 'app-solver-view',
    imports: [SolverInputComponent, SolverResultComponent],
    templateUrl: './solver-view.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './solver-view.component.css'
})
export class SolverViewComponent {
}
