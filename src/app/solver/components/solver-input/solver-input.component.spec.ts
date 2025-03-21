import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolverInputComponent } from './solver-input.component';

describe('SolverInputComponent', () => {
    let component: SolverInputComponent;
    let fixture: ComponentFixture<SolverInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SolverInputComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SolverInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
