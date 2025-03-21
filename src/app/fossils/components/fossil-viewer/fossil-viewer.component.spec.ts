import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FossilViewerComponent } from './fossil-viewer.component';

describe('FossilViewerComponent', () => {
    let component: FossilViewerComponent;
    let fixture: ComponentFixture<FossilViewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FossilViewerComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(FossilViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
