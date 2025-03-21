import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolverResultComponent } from './solver-result.component';

describe('SolverResultComponent', () => {
    let component: SolverResultComponent;
    let fixture: ComponentFixture<SolverResultComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SolverResultComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SolverResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
