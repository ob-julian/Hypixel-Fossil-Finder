import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FossilViewComponent } from './fossil-view.component';

describe('FossilViewComponent', () => {
    let component: FossilViewComponent;
    let fixture: ComponentFixture<FossilViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FossilViewComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(FossilViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
